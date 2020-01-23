from flask import Flask, Blueprint, render_template, jsonify, request, make_response
from datetime import datetime
from data.provider import db
from data.models import ToDo
from app import app

index_bp = Blueprint('index', __name__)
api_bp = Blueprint('api', __name__, url_prefix='/api')

def error_response(message: str, status_code: int):
    return make_response({'message': message}, status_code)

@index_bp.route('/')
def index():
    return render_template('main.html')

@api_bp.route('/todos', methods=['GET', 'POST'])
def get_todos():
    with app.app_context():
        if request.method == 'GET':
            the_list = ToDo.query.order_by(ToDo.created_date)
            return jsonify([td.serialize() for td in the_list.all()]), 200

        # POST
        json_model = request.get_json(silent=True)

        if json_model == None:
            return error_response('Endpoint expects a JSON object.', 400)

        todo = ToDo()
        todo.text = json_model['text']
        todo.is_completed = json_model['is_completed']

        db.session.add(todo)
        db.session.commit()

        return make_response(todo.serialize(), 201)

@api_bp.route('/todos/<int:todo_id>', methods=['PUT', 'DELETE'])
def alter_todo(todo_id: int):
    with app.app_context():
        todo: ToDo = ToDo.query.get(todo_id)

        if todo == None:
            return error_response('ToDo not found.', 404)

        action_text = 'updated'

        if request.method == 'PUT':
            json_model = request.get_json(silent=True)

            if json_model == None:
                return error_response('Endpoint expects a JSON object.', 400)

            todo.is_completed = json_model['is_completed']
            todo.text = json_model['text']
            todo.updated_date = datetime.utcnow()
        else:
            db.session.delete(todo)
            action_text = 'deleted'

        db.session.commit()
        return make_response({'message': f'ToDo {todo_id} {action_text} successfully.'}, 200)