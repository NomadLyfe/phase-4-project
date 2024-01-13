#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Restaurant, Review

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        companies = [
            ("Juliana's", "19 Old Fulton St"),
            ("Prince Street Pizza", "27 Prince St"),
            ("Rubirosa",  "235 Mulberry St"),
            ("L'industrie Pizzeria", "254 S 2nd St"),
            ("Joe's Pizza", "7 Carmine St"),
            ("Joe's Pizza", "1435 Broadway"),
            ("Joe's Pizza", "150 E 14th St"),
            ("Lombardi's Pizza", "32 Spring St"),
            ("Grimaldi's Pizzeria", "1 Front St"),
            ("Pizza Loves Sauce", "147 E Houston St"),
            ("NY Pizza Suprema", "413 8th Ave"),
            ("Olio e Più", "3 Greenwich Ave"),
            ("Joe's Pizza", "216 Bedford Ave"),
            ("Joe's Pizza", "124 Fulton St"),
            ("Bleecker Street Pizza", "69 7th Ave S"),
            ("Nolita Pizza", "68 Kenmare St"),
            ("Lucali", "575 Henry St"),
            ("Little Pizza Parlor", "192 Duffield St"),
            ("Scarr's Pizza", "35 Orchard St"),
            ("99 Cent Fresh Pizza", "1723 Broadway")
        ]
        print("Starting seed...")
        print("Deleting all records...")
        Review.query.delete()
        Restaurant.query.delete()
        User.query.delete()
        # db.session.commit()
        # print("Adding Restaurants...")
        # restaurants = [Restaurant(name=company, address=address) for (company, address) in companies]
        # print("Adding Reviews...")
        # reviews = [Review(title=fake.paragraph(nb_sentences=1) , review=fake.paragraph(nb_sentences=5) , stars=rc([1,2,3,4,5])) for i in range(500)]
        # print("Adding Users...")
        # users = [User(username=fake.user_name()) for i in range(20)]
        # for user in users:
        #     user.password_hash = fake.domain_word()
        #     user.email = fake.free_email()
        # for review in reviews:
        #     review.restaurant = rc(restaurants)
        #     review.user = rc(users)
        # db.session.add_all(restaurants + users + reviews)
        # db.session.commit()
        print('Complete.')
