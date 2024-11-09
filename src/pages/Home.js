import React from "react";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import MainBanner from "../components/MainBanner/MainBanner";
import Support from "../components/Support/Support";
import WorkArea from "../components/WorkArea/WorkArea";
import NewProducts from "../components/NewProducts/NewProducts";
import Overview from "../components/Overview/Overview";
import PartnerArea from "../components/PartnerArea/PartnerArea";

function Home() {
  return (
    <div>
      <Header />
      <Navbar />
      <MainBanner />
      <Support />
      <WorkArea />
      <NewProducts />
      <Overview />
      <PartnerArea />
      Home
    </div>
  );
}

export default Home;
