from flask.cli import AppGroup
from app.models.db import db, environment, SCHEMA
from .users import seed_users, undo_users
from .components import seed_components, undo_components
from .images import seed_images, undo_images


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        # undo_images()
        # undo_components()
        # undo_users()
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.components RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
        db.session.commit()
    seed_users()
    # Add other seed functions here
    seed_components()
    seed_images()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Add other undo functions here
    undo_images()
    undo_components()
    undo_users()
