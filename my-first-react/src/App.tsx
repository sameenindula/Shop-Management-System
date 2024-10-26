import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Category from './pages/category'
import Home from './pages/Home'
import Order from './pages/orders/Order'
import Product from './pages/Product'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path='/products' element={<Product/>}/>
        <Route path='/orders' element={<Order/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
