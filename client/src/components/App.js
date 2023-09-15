import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Store from "./Store"
import Home from "./Home"
import AddStore from "./AddStore"
import AddProduct from "./AddProduct"
import Inventory from "./Inventory"
import StoreEditForm from "./StoreEditForm";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/stores/:id'>
          <Store />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/add_store">
          <AddStore />
        </Route>
        <Route exact path="/add_product">
          <AddProduct />
        </Route>
        <Route exact path="/inventory">
          <Inventory />
        </Route>
        <Route path="/stores/:id/edit" element={<StoreEditForm />} />
      </Switch>
    </>
  )
}

export default App;
