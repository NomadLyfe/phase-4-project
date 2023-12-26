from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db
from config import bcrypt

import re

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-reviews.user',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String, nullable=False, unique=True)
    photo = db.Column(db.String)

    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')
    restaurants = association_proxy('reviews', 'restaurant', creator=lambda restaurant_obj: Review(restaurant=restaurant_obj))

    def __repr__(self):
        return f'User {self.username}, ID {self.id}'
    
    @validates('username', 'email')
    def validate(self, key, value):
        if key == 'username' and len(value) > 23:
            raise ValueError('Username is too long.')
        if key == 'email':
            if len(value) > 50:
                raise ValueError('Email is too long.')
            pattern = r'^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
            regex = re.compile(pattern)
            match = regex.search(value)
            if match == None:
                raise ValueError('Not a proper email')
        return value
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    serialize_rules = ('-user.reviews', '-restaurant.reviews',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    review = db.Column(db.String)
    stars = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))

    user = db.relationship('User', back_populates='reviews')
    restaurant = db.relationship('Restaurant', back_populates='reviews')

    @validates('title', 'review')
    def validate(self, key, value):
        if key == 'review' and len(value) > 500:
            raise ValueError('Title is too long.')
        if key == 'title' and len(value) > 100:
            raise ValueError('Review is too long.')
        return value
    

class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'
    
    serialize_rules = ('-reviews.restaurant',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)

    reviews = db.relationship('Review', back_populates='restaurant', cascade='all, delete-orphan')
    users = association_proxy('reviews', 'user', creator=lambda user_obj: Review(user=user_obj))
