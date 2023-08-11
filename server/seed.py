#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Store, Beer, Inventory

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Deleting data...")
        Store.query.delete()
        Beer.query.delete()
        Inventory.query.delete()

        print("Creating stores...")
        gas_station = Store(name="7-Eleven", address='San Diego, CA')
        convenience = Store(name="BevMo", address="Mordor")
        grocery = Store(name="Ralphs", address="Linda Vista, CA")
        stores = [gas_station, convenience, grocery]

        print("Creating beers...")
        beer1 = Beer(
            name="Sculpin", brand="Ballast Point", style="IPA")
        beer2 = Beer(
            name="Longfin", brand="Ballast Point", style="Lager")
        beer3 = Beer(
            name="WestCoast IPA", brand="Green Flash", style="IPA")
        beer4 = Beer(
            name="Corona Extra", brand="Corona", style="Pale Lager")
        beer5 = Beer(
            name="Mango Cart", brand="Golden Road", style="Wheat Ale")
        beer6 = Beer(
            name="Michelob Ultra", brand="Michelob", style="Lager")
        beer7 = Beer(
            name="Grapefruit Solis", brand="Mike Hess", style="IPA")
        beer8 = Beer(
            name=".394", brand="Alesmith", style="IPA")
        beer9 = Beer(
            name="Kirin Ichiban", brand="Kirin", style="Pale Lager")
        beers = [beer1, beer2, beer3, beer4, beer5, beer6, beer7, beer8, beer9]

        print("Creating inventory...")

        e1 = Inventory(store=gas_station, beer=beer1, quantity=7)
        e2 = Inventory(store=convenience, beer=beer7, quantity=2)
        e3 = Inventory(store=grocery, beer=beer3, quantity=6)
        e4 = Inventory(store=gas_station, beer=beer3, quantity=2)
        inventory = [e1, e2, e3, e4]
        
        db.session.add_all(stores)
        db.session.add_all(beers)
        db.session.add_all(inventory)
        db.session.commit()

    

