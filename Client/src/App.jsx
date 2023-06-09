import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Order from "./pages/Order";
import CheckoutSuccess from "./Checkout/CheckoutSuccess";
import Error from "./pages/Error";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
function App() {
  const TOKEN = Cookies.get("userInfo");
  const user = TOKEN ? jwtDecode(TOKEN).username : null;
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/products/:category" Component={ProductList} />
      <Route path="/product/:category/:id" Component={SingleProduct} />
      <Route path="/cart" Component={Cart} />
      <Route path="/order" Component={Order} />
      <Route path="/success" Component={CheckoutSuccess} />
      <Route path="*" Component={Error} />
      <Route
        path="auths/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="auths/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />
    </Routes>
  );
}

export default App;
