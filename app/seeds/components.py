from app.models import db, environment, SCHEMA, Component
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_components():
    new1 = Component(
        user_id=1, type='navbar', code='<div><nav>Navbar</nav></div>')
    new2 = Component(
        user_id=1, type='button', code='<div><button>Click me</button></div>')

    db.session.add(new1)
    db.session.add(new2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_components():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM components"))

    db.session.commit()
