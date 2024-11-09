import React from "react";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import MainBanner from "../components/MainBanner/MainBanner";
import Support from "../components/Support/Support";

function Home() {
  return (
    <div>
      <Header />
      <Navbar />
      <MainBanner />
      <Support />
      Home
    </div>
  );
}

export default Home;
