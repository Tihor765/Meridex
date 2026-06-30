import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";

import Admin from "./pages/Admin";
import ManageProducts from "./pages/ManageProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/orders" element={<Orders />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route
          path="/edit-product/:id"
          element={<EditProduct />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;