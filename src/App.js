import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import 'react-bootstrap/'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import SignIn from './pages/Signin'
import Search from './pages/Search'
import DatatablePage  from './pages/DatatablePage'
import Echarts from './pages/Echarts'

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <div className="auth-inner" >
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/search" element={<Search />} />
              <Route path="/datatablePage" element={<DatatablePage />} />
              <Route path="/echarts" element={<Echarts />} />
            </Routes>
          </div>
        </div>
        <ToastContainer />
      </div>
    </Router>
  )
}
export default App