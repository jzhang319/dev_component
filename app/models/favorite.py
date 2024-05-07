from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .image import Image

class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    component_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('components.id')), nullable=False)

    user = db.relationship('User', back_populates='favorites', cascade='all', single_parent=True)
    component = db.relationship('Component', back_populates='favorites', cascade='all')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'component_id': self.component_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
