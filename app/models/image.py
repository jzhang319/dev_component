from .db import db, environment, SCHEMA, add_prefix_for_prod

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    component_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('components.id'), postgresql_nullable=False))

    component = db.relationship('Component', back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'component_id': self.component_id,
            'image_url': self.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
