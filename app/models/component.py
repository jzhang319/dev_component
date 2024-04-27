from .db import db, environment, SCHEMA
from .image import Image

class Component(db.Model):
    __tablename__ = 'components'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(40), nullable=False)
    code = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='components')

    images = db.relationship('Image', back_populates='component', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'type': self.type,
            'code': self.code,
            'images': [image.to_dict() for image in self.images],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
