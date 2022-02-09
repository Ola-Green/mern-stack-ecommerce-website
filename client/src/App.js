import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import scrollreveal from "scrollreveal";
import Header from "./components/Header";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { FilteredProducts } from "./screens/FilteredProduct";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import CategoryEdit from "./screens/CategoryEdit";
import CategoryList from "./screens/CategoryList";
import ProductListScreen from "./screens/ProductListScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import Footer from "./components/footer/Footer";
import ForgotPassword from "./screens/ForgotPassword";
import About from "./components/About";
import { ActivateEmail } from "./components/ActivateEmail";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: false,
    });

    sr.reveal(
      `
          #header-big,
          #header-small,
          #home,
          #cat_contain,
          #product,
          #footer
          `,
      {
        opacity: 0,
        interval: 200,
      }
    );
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/search/:keyword" component={HomeScreen} exact />
        <Route path="/page/:pageNumber" component={HomeScreen} exact />
        <Route
          path="/search/:keyword/page/:pageNumber"
          component={HomeScreen}
          exact
        />
        <Route path="/profile" component={ProfileScreen} exact />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/register" component={RegisterScreen} exact />
        <Route path="/forgotpassword" component={ForgotPassword} exact />
        <Route path="/product/:id" component={ProductScreen} exact />
        <Route path="/products/:category" component={FilteredProducts} exact />
        <Route path="/shipping" component={ShippingScreen} exact />
        <Route path="/payment" component={PaymentScreen} exact />
        <Route path="/placeorder" component={PlaceOrderScreen} exact />
        <Route path="/order/:id" component={OrderScreen} exact />
        <Route path="/about" component={About} exact />

        <Route
          path="/admin/product/:id/edit"
          component={ProductEditScreen}
          exact
        />
        <Route path="/admin/userlist" component={UserListScreen} exact />
        <Route path="/admin/orderlist" component={OrderListScreen} exact />

        <Route path="/admin/user/:id/edit" component={UserEditScreen} exact />

        <Route path="/cart/:id?" component={CartScreen} exact />
        <Route path="/admin/categorylist" component={CategoryList} exact />

        <Route path="/admin/category/:id/edit" component={CategoryEdit} exact />

        <Route path="/admin/productlist" component={ProductListScreen} exact />
        <Route
          path="/api/users/activate/:activation_token"
          component={ActivateEmail}
          exact
        />

        <Route
          path="/admin/productlist/:pageNumber"
          component={ProductListScreen}
          exact
        />
      </Switch>
      <Footer />
    </Router>
  );
}
