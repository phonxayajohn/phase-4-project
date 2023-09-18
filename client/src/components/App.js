import React, { useEffect, useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Store from "./Store"
import Home from "./Home"
import AddStore from "./AddStore"
import AddProduct from "./AddProduct"
import Inventory from "./Inventory"
import StoreEditForm from "./StoreEditForm";
import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()


  useEffect(() => {
    fetch('/session')
      .then((res) => {
        if (res.ok) {
          res.json()
            .then((currentUser) => setCurrentUser(currentUser))
        } else {
          setCurrentUser(null)
          if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
            navigate('/login')
          }
        }
      })
  }, [navigate])

  const handleLogout = () => {
    fetch('/logout', {
      method: "DELETE"
    })
      .then((res) => {
        if (res.ok) {
          setCurrentUser(null)
        }
        navigate('/login')
      })
  }


  return (
    <div>
      {currentUser && <Navbar handleLogout={handleLogout} />}

      <Routes>
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={<SignUp setCurrentUser={setCurrentUser} />} />

        {currentUser === null ? (
          <>
            <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
            <Route path="/signup" element={<SignUp setCurrentUser={setCurrentUser} />} />
          </>
        ) : currentUser !== null && (
          <>
            <Route path="/stores/:id" element={<Store />} />
            <Route path="/" element={<Home />} />
            <Route path="/add_store" element={<AddStore />} />
            <Route path="/add_product" element={<AddProduct />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/stores/:id/edit" element={<StoreEditForm />} />
          </>
        )}


      </Routes>
    </div>
  )

}

export default App;
