from flask import Flask
from data.provider import db

app = Flask(__name__)

from app import routes

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../data/todo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)