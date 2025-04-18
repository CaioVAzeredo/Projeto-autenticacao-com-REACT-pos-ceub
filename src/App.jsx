import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";
import Dashboard from "./pages/Dashboard";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<Perfil />} />

          <Route path="/"
            element={
              !token ? (
                <Login setToken={setToken} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }

          />
        </Routes>
      </Router>

    </>
  )
}

export default App
