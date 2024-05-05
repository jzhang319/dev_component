"""added is_admin field to users

Revision ID: 35811b61faaa
Revises: 1604be3eae91
Create Date: 2024-04-28 13:18:27.311658

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '35811b61faaa'
down_revision = '1604be3eae91'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_admin', sa.Boolean(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('is_admin')

    # ### end Alembic commands ###
