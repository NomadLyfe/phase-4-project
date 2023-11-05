#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from flask.ext.bcrypt import Bcrypt

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Review

bcrypt = Bcrypt(app)

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/login')
def login():
    username = request.get_jason()['username']
    user = User.query.filter_by(username = username)
    password = request.get_json()['password']
    if user.authenticate(password):
        session['user_id'] = user.id
        return user.to_dict(), 200
    return {'error': 'Invalid username or password'}, 401


if __name__ == '__main__':
    app.run(port=5555, debug=True)

