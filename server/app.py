#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Review, Restaurant

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
            return {'error': 'Invalid user information'}, 422

class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter_by(id = session['user_id']).first()
            return user.to_dict(), 200
        return {}, 204

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
    
class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
            return {}, 204
        return {'error': 'You are not logged in'}, 401
    
class Restaurants(Resource):
    def get(self):
        restaurants = [restaurant.to_dict() for restaurant in Restaurant.query.all()]
        if restaurants:
            return make_response(restaurants, 200)
        return {}, 204

class Reviews(Resource):
    def get(self):
        restaurant = Restaurant.query.filter_by(id = session['restaurant_id']).first()
        reviews = [review.to_dict() for review in Review.query.filter_by(restaurant_id = restaurant.id).all()]
        if reviews:
            return make_response(reviews, 200)
        return {}, 204

class Rest(Resource):
    def post(self):
        restaurant = Restaurant.query.filter_by(name = request.get_json().get('name')).filter_by(address = request.get_json().get('address')).first()
        session['restaurant_id'] = restaurant.id
    
    def delete(self):
        session['restaurant_id'] = None

api.add_resource(Rest, '/rest', endpoint='rest')
api.add_resource(Reviews, '/reviews', endpoint='reviews')
api.add_resource(Restaurants, '/restaurants', endpoint='restaurants')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Signup, '/signup', endpoint='signup')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

