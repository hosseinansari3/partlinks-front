import React from "react";

import MainBanner from "../components/Home/MainBanner/MainBanner";
import Support from "../components/Home/Support/Support";
import WorkArea from "../components/Home/WorkArea/WorkArea";
import NewProducts from "../components/Home/NewProducts/NewProducts";
import Overview from "../components/Home/Overview/Overview";
import PartnerArea from "../components/Home/PartnerArea/PartnerArea";
import Categories from "../components/Home/Categories/Categories";
import NewsLetter from "../components/Home/NewsLetter/NewsLetter";

function Home() {
  return (
    <div>
      <MainBanner />
      <Support />
      <WorkArea />
      <NewProducts />
      <Overview />
      <PartnerArea />
      <Categories />
      <NewsLetter />
    </div>
  );
}

export default Home;
