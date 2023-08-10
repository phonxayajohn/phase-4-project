from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Store(db.Model, SerializerMixin):
    __tablename__ = 'stores'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)

    inventory = db.relationship("Inventory", cascade="all, delete", backref="store")

    def __repr__(self):
        return f'<Store {self.name}>'
    
class Beer(db.Model, SerializerMixin):
    __tablename__ = 'beers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    brand = db.Column(db.String)
    style = db.Column(db.String)

    inventory = db.relationship("Inventory", cascade="all, delete", backref="beer")

    def __repr__(self):
        return f'<{self.name}, {self.brand}, {self.style}>'
    
class Inventory(db.Model, SerializerMixin):
    __tablename__ = 'inventory'

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)

    store_id = db.Column(db.Integer, db.ForeignKey("stores.id"))
    beer_id = db.Column(db.Integer, db.ForeignKey("beers.id"))

    def __repr__(self):
        return f"<Inventory {self.store_id}, {self.beer_id}, {self.quantity}>"