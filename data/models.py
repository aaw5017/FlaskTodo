from data.provider import db
from datetime import datetime

class ToDo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(250))
    is_completed = db.Column(db.Boolean, nullable=False, default=False)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def serialize(self):
        return {
            'id': self.id,
            'text': self.text,
            'is_completed': self.is_completed
        }

    def __repr__(self):
        return '<ToDo %r>' % self.id