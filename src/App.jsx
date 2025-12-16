import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles/Layout.css'
import './styles/Home.css'
import './styles/User.css'
import './styles/Footer.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './component/Home';
import Header from './component/Header';
import User from './component/User';
import Transaction from './component/Transaction';
import Layout from './component/Layout';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Layout >
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/user" element={<User />}/>
        <Route path="/transaction" element={<Transaction />}/>

      </Routes>
      </Layout>
    </Router>

    </>
  )
}

export default App
