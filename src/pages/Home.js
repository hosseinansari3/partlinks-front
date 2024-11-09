import React from "react";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import MainBanner from "../components/MainBanner/MainBanner";
import Support from "../components/Support/Support";
import WorkArea from "../components/WorkArea/WorkArea";
import TopProducts from "../components/NewProducts/NewProducts";

function Home() {
  return (
    <div>
      <Header />
      <Navbar />
      <MainBanner />
      <Support />
      <WorkArea />
      <TopProducts />
      Home
    </div>
  );
}

export default Home;
