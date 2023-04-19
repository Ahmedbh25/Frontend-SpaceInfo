import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Products from './pages/products/Products';
import ProductDetails from './pages/product_indetails/ProductDetails';
import Contact from './pages/contact/Contact';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Reviews from './pages/review/review';
import Buy from './pages/buy/Buy';
import Profile from './pages/profile/Profile';
import Browse from './pages/browse/Browse'
import Card from './pages/card/Card';
import Cards from './pages/cards/Cards';
import Error from './pages/error/Error';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product_details/:prodID" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/review" element={<Reviews />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/card/:productID" element={<Card />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
