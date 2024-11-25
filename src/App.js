import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About/About";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Contact from "./pages/Contact/Contact";
import SellCar from "./pages/SellCar/SellCar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import BusinessRegister from "./pages/Register/Business/BusinessRegister";
import PrivateRegister from "./pages/Register/Private/PrivateRegister";
import VendorRegister from "./pages/Register/Vendor/VendorRegister";
import BusinessComplete from "./pages/Register/Business/BusinessComplete";
import PrivateComplete from "./pages/Register/Private/PrivateComplete";
import Panel from "./pages/Panel";
import SellCarSuccess from "./pages/SellCar/SellCarSuccess";
import SellCarVerify from "./pages/SellCar/SellCarVerify/SellCarVerify";
import Preloader from "./components/Preloader";

function App() {
  const location = useLocation();

  return (
    <div>
      <Preloader />
      <ToastContainer toastClassName="custom-toast" />

      {location.pathname !== "/login" &&
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
        <Route path="auth/register" element={<Register />} />
        <Route
          path="auth/member/business/register"
          element={<BusinessRegister />}
        />
        <Route
          path="auth/member/private/register"
          element={<PrivateRegister />}
        />
        <Route path="auth/vendor/register" element={<VendorRegister />} />

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
      !location.pathname.includes("/auth") ? (
        <Footer />
      ) : null}
    </div>
  );
}

export default App;
