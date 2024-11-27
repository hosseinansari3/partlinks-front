import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About/About";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Contact from "./pages/Contact/Contact";
import SellCar from "./pages/SellCar/SellCar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import BusinessComplete from "./pages/Register/Business/BusinessComplete";
import PrivateComplete from "./pages/Register/Private/PrivateComplete";
import Panel from "./pages/Panel";
import SellCarSuccess from "./pages/SellCar/SellCarSuccess";
import SellCarVerify from "./pages/SellCar/SellCarVerify/SellCarVerify";
import Preloader from "./components/Preloader/Preloader";
import { useSelector } from "react-redux";
import ResetPassword from "./pages/Login/ResetPassword";

function App() {
  const location = useLocation();
  const isLoading = useSelector((state) => state?.preloader?.isLoading);

  return (
    <div>
      <Preloader display={isLoading} />
      <ToastContainer toastClassName="custom-toast" />

      {location.pathname !== "/login" &&
      location.pathname !== "/password/reset" &&
      location.pathname !== "/sell-car/verify" &&
      !location.pathname.includes("/auth") ? (
        <Navbar />
      ) : null}

      <Routes>
        <Route exact index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="sell-car" element={<SellCar />} />
        <Route path="sell-car/success" element={<SellCarSuccess />} />
        <Route path="sell-car/verify" element={<SellCarVerify />} />

        <Route path="login" element={<Login />} />
        <Route path="password/reset" element={<ResetPassword />} />

        <Route path="auth/register" element={<Register />} />

        <Route
          path="auth/member/business/complete"
          element={<BusinessComplete />}
        />
        <Route
          path="auth/member/private/complete"
          element={<PrivateComplete />}
        />
        <Route path="member/" element={<Panel />} />
      </Routes>
      {location.pathname !== "/login" &&
      location.pathname !== "/password/reset" &&
      location.pathname !== "/sell-car/verify" &&
      !location.pathname.includes("/auth") ? (
        <Footer />
      ) : null}
    </div>
  );
}

export default App;
