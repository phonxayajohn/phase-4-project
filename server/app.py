#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource
import os
from models import db, Store, Beer, Inventory

# Local imports
from config import app, db, api

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app,db)

db.init_app(app)
api = Api(app)


@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'

class Stores(Resource):
    def get(self):
        stores = [store.to_dict(rules=('-inventory',)) for store in Store.query.all()]
        return make_response(stores, 200)
    
    def post(self):
        try:
            new_store = Store(
                name = request.json['name'],
                address = request.json['address'],
            )
            db.session.add(new_store)
            db.session.commit()

            return make_response(new_store.to_dict(), 201)
        
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
        
api.add_resource(Stores, "/stores")

class StoresById(Resource):
    
    def get(self, id):
        store = Store.query.filter_by(id=id).first()

        if store:
            return make_response(store.to_dict(), 200)
        return make_response({"error": "Store not found"}, 404)
    
    def patch(self,id):
        store = Store.query.filter_by(id=id).first()

        for attr in request.form:
            setattr(store, attr, request.form[attr])
        
        db.session.add(store)
        db.session.commit()

        return make_response(store.to_dict(), 200)
    
    def delete(self, id):
        store = Store.query.filter_by(id=id).first()

        if store:
            db.session.delete(store)
            db.session.commit()

            return make_response({}, 204)
        return make_response({"error": "Store not found"}, 404)
    
api.add_resource(StoresById, "/stores/<int:id>")

class Beers(Resource):

    def get(self):
        beers = [beer.to_dict(rules=('-inventory',)) for beer in Beer.query.all()]
        return make_response(beers, 200)
    
    def post(self):
        try:
            new_beer = Beer(
                name = request.json['name'],
                brand = request.json['brand'],
                style = request.json['style']
            )
            db.session.add(new_beer)
            db.session.commit()

            return make_response(new_beer.to_dict(), 201)
        
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
        
api.add_resource(Beers, "/beers")

class BeersById(Resource):
    
    def get(self, id):
        beer = Beer.query.filter_by(id=id).first()

        if beer:
            return make_response(beer.to_dict(), 200)
        return make_response({"error": "Beer not found"}, 404)
    
    def patch(self,id):
        beer = Beer.query.filter_by(id=id).first()

        for attr in request.form:
            setattr(beer, attr, request.form[attr])
        
        db.session.add(beer)
        db.session.commit()

        return make_response(beer.to_dict(), 200)
    
    def delete(self, id):
        beer = Beer.query.filter_by(id=id).first()

        if beer:
            db.session.delete(beer)
            db.session.commit()

            return make_response({}, 204)
        return make_response({"error": "Beer not found"}, 404)
    
api.add_resource(BeersById, "/beers/<int:id>")

class Inventories(Resource):

    def post(self):
        try:
            inventory_entry = Inventory(
                quantity = request.json['quantity'],
                store_id = request.json['store_id'],
                beer_id = request.json['beer_id']
            )
            db.session.add(inventory_entry)
            db.session.commit()

            return make_response(inventory_entry.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
        
api.add_resource(Inventories, "/inventory")

class InventoryById(Resource):

    def patch(self, id):
        inventory = Inventory.query.filter_by(id=id).first()

        for attr in request.form:
            setattr(inventory, attr, request.form[attr])
        
        db.session.add(inventory)
        db.session.commit()

        return make_response(inventory.to_dict(), 200)
    
api.add_resource(InventoryById, "/inventory/<int:id>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

