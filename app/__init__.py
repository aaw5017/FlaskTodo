from flask import Flask, Blueprint
from data.provider import db

app = Flask(__name__)

from app.routes import index_bp, api_bp
app.register_blueprint(index_bp)
app.register_blueprint(api_bp);

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../data/todo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)