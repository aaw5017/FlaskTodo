from app import app
from data.provider import db

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../data/todo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)