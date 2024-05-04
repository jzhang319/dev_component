from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Component, db
from flask import request

component_routes = Blueprint('components', __name__)

@component_routes.route('/', methods=['POST'])
@login_required
def create_component():
    """
    Create a new component and returns it as a dictionary
    """
    data = request.form

    new_component = Component(
        user_id=current_user.id,
        type=data['type'],
        code=data['code'],
    )

    db.session.add(new_component)
    db.session.commit()

    return new_component.to_dict()

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

    db.session.delete(component)
    db.session.commit()

    return {'message': 'Component deleted'}


@component_routes.route('/')
def components():
    """
    Query for all components and returns them in a list of component dictionaries
    """
    components = Component.query.all()
    return {'components': [component.to_dict() for component in components]}
