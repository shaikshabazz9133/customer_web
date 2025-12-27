import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Booking from "./pages/Booking";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBookings";
import Offers from "./pages/Offers";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrdersDetails";
import HistoryDetails from "./pages/HistoryDetails";
import History from "./pages/History";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetails />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/account" element={<Account />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/book/:serviceId" element={<Booking />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/history" element={<History />} />
          <Route path="/history/:id" element={<HistoryDetails />} />
          <Route
            path="/booking-confirmation/:bookingId"
            element={<BookingConfirmation />}
          />
        </Route>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
