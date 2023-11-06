#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Review

# Views go here!

class Signup(Resource):
    def post(self):
        try:
            print('1')
            user = User(username=request.get_json().get('username'))
            print('2')
            user.password_hash=request.get_json().get('password')
            print('3')
            if user:
                print(user)
                db.session.add(user)
                db.session.commit()
                print(user.id)
                session['user_id'] = user.id
                print(user)
                return user.to_dict(), 201
            return {'error': 'Invalid information submitted'}, 422
        except:
            print(request.get_json().get('password'))
            return {'error': 'Invalid user information'}, 422

class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter_by(id = session['user_id']).first()
            return user.to_dict(), 200
        return {'error': 'Not logged in'}, 401

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        user = User.query.filter_by(username = username).first()
        password = request.get_json()['password']
        if user and user.authenticate(password):
            session['user_id'] = user.id
            session.modified = True
            print(session['user_id'])
            return user.to_dict(), 201
        return {'error': 'Invalid username or password'}, 401

api.add_resource(Login, '/login', endpoint='login')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Signup, '/signup', endpoint='signup')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

