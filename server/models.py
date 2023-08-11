from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

class Store(db.Model, SerializerMixin):
    __tablename__ = 'stores'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)

    inventory = db.relationship("Inventory", cascade="all, delete", backref="store")
    
    serialize_rules = ("-inventory.store",)

    @validates('name')
    def validates_name(self, key, name):
        if not name:
            raise ValueError("Must have name")
        return name
    
    @validates('address')
    def validates_address(self, key, address):
        if not address:
            raise ValueError("Must have address")
        return address

    def __repr__(self):
        return f'<Store {self.name}>'
    
class Beer(db.Model, SerializerMixin):
    __tablename__ = 'beers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    brand = db.Column(db.String)
    style = db.Column(db.String)

    inventory = db.relationship("Inventory", cascade="all, delete", backref="beer")

    serialize_rules = ("-inventory.beer",)

    @validates('name')
    def validates_name(self, key, name):
        if not name:
            raise ValueError("Must have name")
        return name
    
    @validates('brand')
    def validates_brand(self, key, brand):
        if not brand:
            raise ValueError("Must have brand")
        return brand
    
    @validates('style')
    def validates_style(self, key, style):
        if not style:
            raise ValueError("Must have style")
        return style

    def __repr__(self):
        return f'<{self.name}, {self.brand}, {self.style}>'
    
class Inventory(db.Model, SerializerMixin):
    __tablename__ = 'inventory'

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)

    store_id = db.Column(db.Integer, db.ForeignKey("stores.id"))
    beer_id = db.Column(db.Integer, db.ForeignKey("beers.id"))

    serialize_rules = ("-store.inventory", "-beer.inventory")

    @validates('quantity')
    def validate_quantity(self, key, quantity):
        if not 1 <= quantity:
            raise ValueError("Please enter valid quantity")
        return quantity


    def __repr__(self):
        return f"<Inventory {self.store_id}, {self.beer_id}, {self.quantity}>"