import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import OrderNotFound from "./pages/OrderNotFound";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import RootLayout from "./pages/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<RootLayout />} errorElement={<OrderNotFound />}>
      [
      <Route
        path="/"
        element={<Home />}
        errorElement={<OrderNotFound />}
      ></Route>
      ,<Route path="/menu" element={<Menu />}></Route>,
      <Route path="/cart" element={<Cart />}></Route>,
      <Route path="/checkout" element={<Checkout />}></Route>,
      <Route path="/order/:orderId" element={<Order />}></Route>]
    </Route>,
  ])
);

export default router;
