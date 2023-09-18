#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
import os
from models import db, Store, Beer, Inventory, User
import secrets

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

secret_key = secrets.token_hex(16)

app.secret_key = secret_key

@app.route('/')
def index():
    return '<h1>Phase 5 Project Server</h1>'

class Register(Resource):
    
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)
    
    def post(self):
        data = request.get_json()

        try:
            new_user = User(
                email = data['email']
            )
            new_user.password_hash = data['password']
            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id

            return make_response(new_user.to_dict(), 201)
        
        except:
            return make_response({"error": "Unprocessable Content"}, 422)
api.add_resource(Register, '/register')
        
class CheckSession(Resource):
    
    def get(self):
        user_id = session.get('user_id')

        if not user_id:
            return {"error": "Unathorized"}, 401

        current_user = User.query.filter(User.id == user_id).first()
        return current_user.to_dict(), 200
api.add_resource(CheckSession, '/session', endpoint='session')

class Login(Resource):
    
    def post(self):
        data = request.get_json()

        check_user = User.query.filter(User.email == data['email']).first()

        if check_user and check_user.authenticate(data['password']):
            session['user_id'] = check_user.id

            return make_response(check_user.to_dict(), 200)
        return {"error": "Unathorized"}, 401
api.add_resource(Login, '/login', endpoint='login')

class Logout(Resource):

    def delete(self):

        if session.get('user_id'):
            session['user_id'] = None
            return {}, 204
        return {"error": "Unathorized"}, 401
api.add_resource(Logout, '/logout', endpoint='logout')

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
        
        if not store:
            return make_response({"error": "Store not found"}, 404)

        data = request.get_json() 
    
        store.name = data.get('name', store.name)
        store.address = data.get('address', store.address)

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

        data = request.json

        for attr in data:
            setattr(beer, attr, data[attr])
        
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

    def get(self):

        inventories = Inventory.query.all()

        serialized_inventories = []

        for inventory in inventories:
            serialized_inventory = inventory.to_dict()

            serialized_inventory['beer'] = inventory.beer.to_dict()
            serialized_inventory['store'] = inventory.store.to_dict()

            serialized_inventories.append(serialized_inventory)
        
        return make_response(serialized_inventories, 200)


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

    def get(self, id):
        inventory = Inventory.query.filter_by(id=id).first()
        
        if inventory:
            return make_response(inventory.to_dict(rules=('-store', '-beer')), 200)
        return make_response({"error": "Inventory not found"}, 404)

    def patch(self, id):
        inventory = Inventory.query.filter_by(id=id).first()

        data = request.json

        for attr in data:
            setattr(inventory, attr, data[attr])
        
        db.session.add(inventory)
        db.session.commit()

        return make_response(inventory.to_dict(), 200)
    
    def delete(self, id):
        inventory = Inventory.query.filter_by(id=id).first()

        if inventory:
            db.session.delete(inventory)
            db.session.commit()

            return make_response({}, 204)
        return make_response({"error": "Inventory not found"}, 404)
    
api.add_resource(InventoryById, "/inventory/<int:id>")

class InventoryByUser(Resource):

    def get(self, user_id):
        user_id = session.get('user_id')
        user_inventory = [inventory.to_dict() for inventory in Inventory.query.filter(Inventory.user_id == user_id)]

        return make_response(user_inventory, 200)

if __name__ == '__main__':
    app.run(port=5555, debug=True)

