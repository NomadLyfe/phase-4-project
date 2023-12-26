#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource, reqparse
import requests
import pprint
from urllib.parse import quote
from urllib.error import HTTPError
import sys

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Review, Restaurant

# Views go here!

class Signup(Resource):
    def post(self):
        try:
            username = request.get_json().get('username')
            email = request.get_json().get('email')
            user = User(username=username)
            user.password_hash = request.get_json().get('password')
            user.email = email
            if user:
                print(user)
                db.session.add(user)
                db.session.commit()
                session['user_id'] = user.id
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
    
    def patch(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        email = request.get_json()['email']
        user = User.query.filter_by(username = username).first()
        if password:
            user.password_hash = password
        if email:
            user.email = email
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 200

    
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
        if restaurant:
            session['restaurant_id'] = restaurant.id
        else :
            new_restuarant = Restaurant(name = request.get_json().get('name') , address = request.get_json().get('address'))
            db.session.add(new_restuarant)
            db.session.commit()
            session['restaurant_id'] = new_restuarant.id
    
    def delete(self):
        session['restaurant_id'] = None

class Results(Resource):
    def post(self):
        API_KEY = 'kBmLOigA37g8LBZPX2Lm60qZA-y7zd_b5cvfN-h4rK9AsO-X5i8PaTcbkmbvYJsq3YOMuwigVXgU8-PQSJipSfU4LP70_j4V8K0BKGAlXcHbs7iM04XZrn7fd3hJZXYx'
        API_HOST = 'https://api.yelp.com'
        SEARCH_PATH = '/v3/businesses/search'
        BUSINESS_PATH = '/v3/businesses/'
        SEARCH_LIMIT = 20
        def requester(host, path, api_key, url_params=None):
            url_params = url_params or {}
            url = '{0}{1}'.format(host, quote(path.encode('utf8')))
            headers = {'Authorization': 'Bearer %s' % api_key,}
            print(u'Querying {0} ...'.format(url))
            response = requests.request('GET', url, headers=headers, params=url_params)
            return response.json()
        def search(api_key, term, location):
            url_params = {
                'term': term.replace(' ', '+'),
                'location': location.replace(' ', '+'),
                'limit': SEARCH_LIMIT,
                'offset': request.get_json().get('offset')
            }
            return requester(API_HOST, SEARCH_PATH, api_key, url_params=url_params)
        def get_business(api_key, business_id):
            business_path = BUSINESS_PATH + business_id
            return requester(API_HOST, business_path, api_key)
        def query_api(term, location):
            response = search(API_KEY, term, location)
            businesses = response.get('businesses')
            if not businesses:
                print(u'No businesses for {0} in {1} found.'.format(term, location))
                return
            """business_id = businesses[0]['id']
            print(u'{0} businesses found, querying business info for the top result "{1}" ...'.format(len(businesses), business_id))
            response = get_business(API_KEY, business_id)
            print(u'Result for business "{0}" found:'.format(business_id))"""
            return response
        def main():
            input_values = request.get_json()
            if session.get('query') and session.get('location') and not input_values.get('restaurant'):
                return query_api(session['query'], session['location'])
            try:
                session['query'] = input_values.get('restaurant')
                session['location'] = input_values.get('location')
                return query_api(input_values.get('restaurant'), input_values.get('location'))
            except HTTPError as error:
                sys.exit('Encountered HTTP error {0} on {1}:\n {2}\nAbort program.'.format(error.code, error.url, error.read(),))
        return main()

api.add_resource(Results, '/results')
api.add_resource(Rest, '/rest', endpoint='rest')
api.add_resource(Reviews, '/reviews', endpoint='reviews')
api.add_resource(Restaurants, '/restaurants', endpoint='restaurants')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Signup, '/signup', endpoint='signup')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

