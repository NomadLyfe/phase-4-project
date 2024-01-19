#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, render_template
from flask_restful import Resource
import requests
from urllib.error import HTTPError
import sys

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Review, Restaurant

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

class Signup(Resource):
    def post(self):
        try:
            username = request.get_json().get('username')
            email = request.get_json().get('email')
            user = User(username=username)
            user.password_hash = request.get_json().get('password')
            user.email = email
            if user:
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
            return user.to_dict(), 201
        return {'error': 'Invalid username or password'}, 401
    
    def patch(self):
        username = request.get_json().get('originalusername')
        newusername = request.get_json().get('username')
        password = request.get_json().get('password')
        email = request.get_json().get('email')
        pic = request.get_json().get('pic')
        user = User.query.filter_by(username = username).first()
        if newusername:
            user.username = newusername
        if password:
            user.password_hash = password
        if email:
            user.email = email
        if pic:
            user.photo = pic
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        session.modified = True
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
        reviews = [review.to_dict() for review in Review.query.filter_by(restaurant_id = restaurant.id).order_by(Review.id.desc()).all()]
        if reviews:
            return make_response(reviews, 200)
        return {}, 204
    def post(self):
        title = request.get_json().get('title')
        stars = request.get_json().get('stars')
        user = User.query.filter_by(id = session['user_id']).first()
        restaurant = request.get_json().get('restaurant')
        address = request.get_json().get('address')
        review = request.get_json().get('review')
        restaurant_obj = Restaurant.query.filter_by(name = restaurant, address = address).first()
        review_obj = Review(title=title, stars=stars, review=review, user=user, restaurant=restaurant_obj)
        db.session.add(review_obj)
        db.session.commit()
        return review_obj.to_dict(), 201

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
        API_URL = 'https://api.yelp.com/v3/businesses/search'
        SEARCH_LIMIT = 20
        def requester(api_url, api_key, url_params=None):
            url_params = url_params or {}
            headers = {'Authorization': f'Bearer {api_key}'}
            print(f'Querying {api_url} ...')
            response = requests.request('GET', api_url, headers=headers, params=url_params)
            return response.json()
        def search(api_key, term, location):
            url_params = {
                'term': term.replace(' ', '+'),
                'location': location.replace(' ', '+'),
                'limit': SEARCH_LIMIT,
                'offset': request.get_json().get('offset')
            }
            return requester(API_URL, api_key, url_params=url_params)
        def query_api(term, location):
            response = search(API_KEY, term, location)
            businesses = response.get('businesses')
            if not businesses:
                print(f'No businesses for {term} in {location} found.')
                return None
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
                sys.exit(f'Encountered HTTP error {error.code} on {error.url}:\n {error.read()}\nAbort program.')
        return main()

class reviews_by_stars(Resource):
    def get(self, stars):
        reviews = [review.to_dict() for review in Review.query.filter(Review.stars > stars).all()]
        return reviews, 200

api.add_resource(reviews_by_stars, '/reviews/<int:stars>')
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
