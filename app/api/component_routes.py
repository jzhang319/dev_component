from flask import Blueprint, jsonify, current_app
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import Component, db, Image
from flask import request
from werkzeug.utils import secure_filename
from google.cloud import storage
from google.oauth2 import service_account
import os
import subprocess

# access the environment variables
key_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
credentials = service_account.Credentials.from_service_account_file(key_path)
# create storage client
storage_client = storage.Client(credentials=credentials)

component_routes = Blueprint('components', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@component_routes.route('/', methods=['POST'])
@login_required
def create_component():
    """
    Create a new component and returns it as a dictionary
    """
    data = request.form
    image = request.files['image']

    new_component = Component(
        user_id=current_user.id,
        type=data['type'],
        code=data['code'],
    )

    db.session.add(new_component)
    db.session.commit()

    # Ensure the file is a valid image
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename.replace(" ", "_"))

        # Create a Cloud Storage client.
        gcs = storage.Client()

        # Get the bucket that the file will be uploaded to.
        bucket = gcs.get_bucket(current_app.config['devcomponent'])

        # Create a new blob and upload the file's content.
        blob = bucket.blob(filename)
        blob.upload_from_string(
            image.read(),
            content_type=image.content_type
        )

        # Make the blob publicly viewable.
        blob.make_public()

        new_image = Image(
            url=blob.public_url,
            component_id=new_component.id,
        )

        db.session.add(new_image)
        db.session.commit()

    return new_component.to_dict()

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@component_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_component(id):
    """
    Update a component and return it as a dictionary
    """
    data = request.form

    component = Component.query.get(id)
    if component.user_id != current_user.id or current_user.is_admin == False:
        return {'errors': 'Unauthorized'}, 401

    component.type = data['type']
    component.code = data['code']

    db.session.commit()

    return component.to_dict()

@component_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_component(id):
    """
    Delete a component and return a success message
    """
    component = Component.query.get(id)
    if component.user_id != current_user.id or current_user.is_admin == False:
        return {'errors': 'Unauthorized'}, 401

    # Delete the images associated with the component from GCS
    for image in component.images:
        # Parse the image URL to get the blob name
        blob_name = image.url.rsplit('/', 1)[-1]

        # Get the bucket that the image is stored in
        bucket = storage_client.get_bucket(current_app.config['devcomponent'])

        # Get the blob and delete it
        blob = bucket.blob(blob_name)
        blob.delete()

        # Delete the image from the database
        db.session.delete(image)

    # Delete the component from the database
    db.session.delete(component)
    db.session.commit()

    return {'message': 'Component deleted'}

@component_routes.route('/<int:id>', methods=['GET'])
def get_component(id):
    component = Component.query.options(joinedload('user')).get(id)
    if component is None:
        return {'errors': 'Component not found'}, 404

    formatted_component = {
        **component.to_dict(),
        'user': {
            'id': component.user.id,
            'username': component.user.username,
        },
    }

    return jsonify(formatted_component)

@component_routes.route('/')
def get_all_components():
    components = Component.query.options(joinedload('user')).all()

    formatted_components = [
        {
            **component.to_dict(),
            'user': {
                'id': component.user.id,
                'username': component.user.username,
            },
        }
        for component in components
    ]

    return jsonify(formatted_components)
