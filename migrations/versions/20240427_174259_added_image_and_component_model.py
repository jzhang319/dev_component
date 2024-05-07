"""added image and component model

Revision ID: 1604be3eae91
Revises: ffdc0a98111c
Create Date: 2024-04-27 17:42:59.601962

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_DEBUG")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '1604be3eae91'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None



def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('components',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=40), nullable=False),
    sa.Column('code', sa.String(length=1000), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE components SET SCHEMA {SCHEMA};")

    op.create_table('images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('image_url', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('component_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['component_id'], ['components.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE images SET SCHEMA {SCHEMA};")

    with op.batch_alter_table('users', schema=SCHEMA) as batch_op:
        batch_op.add_column(sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True))
        batch_op.add_column(sa.Column('updated_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True))


    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=SCHEMA) as batch_op:
        batch_op.drop_column('updated_at')
        batch_op.drop_column('created_at')

    op.drop_table('images')
    op.drop_table('components')
    # ### end Alembic commands ###
