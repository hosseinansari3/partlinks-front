import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <div>
      <ToastContainer toastClassName="custom-toast" />
      {window.location.pathname !== "/login" ? <Header /> : null}
      {window.location.pathname !== "/login" ? <Navbar /> : null}

      <Routes>
        <Route exact index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="sell-car" element={<SellCar />} />
        <Route path="login" element={<Login />} />
      </Routes>
      {window.location.pathname !== "/login" ? <Footer /> : null}
    </div>
  );
}

export default App;
