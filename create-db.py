from app import app
from data.provider import db

with app.app_context():
    db.init_app(app)
    db.create_all()