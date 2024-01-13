"""made User's photo column

Revision ID: 4251702c25b5
Revises: fd5b7e235b1f
Create Date: 2023-12-26 00:37:14.340223

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4251702c25b5'
down_revision = 'fd5b7e235b1f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('photo', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('photo')

    # ### end Alembic commands ###