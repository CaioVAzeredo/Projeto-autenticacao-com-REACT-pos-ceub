import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Home from "./pages/Home";
import Registro from "./pages/Registro";

function App() {
  const [token, setToken] = useState()

  useEffect(() => {
    const tokenSalvo = localStorage.getItem("authToken")
    if (tokenSalvo) {
      setToken(tokenSalvo)
    }
  })
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/registro" element={<Registro />} />

          <Route path="/"
            element={
              !token ? (
                <Login setToken={setToken} />
              ) : (
                <Navigate to="/Home" replace />
              )
            }

          />
        </Routes>
      </Router>

    </>
  )
}

export default App
