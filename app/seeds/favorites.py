from app.models import db, environment, SCHEMA, Favorite
from sqlalchemy.sql import text

def seed_favorites():
    favorite1 = Favorite(
      user_id=2, component_id=1
    )
    favorite2 = Favorite(
      user_id=2, component_id=2
    )
    favorite3 = Favorite(
      user_id=2, component_id=3
    )
    favorite4 = Favorite(
      user_id=2, component_id=4
    )
    favorite5 = Favorite(
      user_id=2, component_id=5
    )
    favorite6 = Favorite(
      user_id=1, component_id=6
    )
    favorite7 = Favorite(
      user_id=1, component_id=7
    )
    favorite8 = Favorite(
      user_id=1, component_id=8
    )
    favorite9 = Favorite(
      user_id=1, component_id=9
    )
    favorite10 = Favorite(
      user_id=1, component_id=10
    )

    db.session.add(favorite1)
    db.session.add(favorite2)
    db.session.add(favorite3)
    db.session.add(favorite4)
    db.session.add(favorite5)
    db.session.add(favorite6)
    db.session.add(favorite7)
    db.session.add(favorite8)
    db.session.add(favorite9)
    db.session.add(favorite10)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
