from flask import Flask, render_template, jsonify, request, make_response
from datetime import datetime
from time import sleep
from data.provider import db
from data.ToDo import ToDo
from app import app

@app.route('/')
def index():
    return render_template('main.html')

@app.route('/todos', methods=['GET', 'POST'])
def get_todos():
    with app.app_context():
        if request.method == 'GET':
            the_list = ToDo.query.order_by(ToDo.created_date)
            return jsonify([td.serialize() for td in the_list.all()])
        else:
            json_model = request.get_json(silent=True)
            if json_model == None:
                return make_response({'message': 'Endpoint expects a JSON object.'}, 400)
            todo = ToDo()
            todo.text = json_model['text']
            todo.is_completed = json_model['is_completed']
            db.session.add(todo)
            db.session.commit()
            return make_response(todo.serialize(), 201)

@app.route('/todos/<int:todo_id>', methods=['PUT', 'DELETE'])
def alter_todo(todo_id: int):
    with app.app_context():
        todo: ToDo = ToDo.query.get(todo_id)

        if todo == None:
            return 'ToDo not found.', 404

        if request.method == 'PUT':
            json_model = request.get_json(silent=True)

            if json_model == None:
                return 'Endpoint expects a JSON object.', 400

            todo.is_completed = json_model['is_completed']
            todo.text = json_model['text']
            db.session.commit()
            return 'ToDo updated successfully'
        else:
            db.session.delete(todo)
            db.session.commit()
            return 'ToDo deleted successfully', 204