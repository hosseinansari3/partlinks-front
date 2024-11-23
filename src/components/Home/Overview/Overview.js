import React, { useEffect } from "react";
import { fetchHomeData } from "../../../Redux/homeDataSlice";
import { useDispatch, useSelector } from "react-redux";

function Overview() {
  const dispatch = useDispatch();
  const { homeData, status, error } = useSelector((state) => state.homeData);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHomeData()); // Fetch data on component mount
    }
  }, [status, dispatch]);

  useEffect(() => {
    console.log("homeData", homeData);
  }, [homeData]);

  return (
    <div className="overview-area pt-100 pb-70">
      <div className="container">
        <div className="overview-item">
          <div className="row justify-content-center">
            {homeData?.result?.banner.map((item) => {
              return (
                <div className="col-lg-6 col-sm-6">
                  <div className="overview-image">
                    <img src={`https://partlinks.com.au/${item}`} alt="image" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
