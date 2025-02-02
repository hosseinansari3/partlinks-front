import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./NewProducts.css";
import { fetchHomeData } from "../../../Redux/homeDataSlice";

function NewProducts() {
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
    <section className="top-products-area pt-100 pb-70">
      <div className="container">
        <div className="section-title">
          <h2>New Products</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="row justify-content-center">
          {homeData?.result?.new_products.map((item) => {
            return (
              <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                <div className="single-top-products position-relative">
                  <div className="top-products-image">
                    <a href="#">
                      <img
                        src={`https://partlinks.com.au/${item.image}`}
                        alt="image"
                      />
                    </a>
                  </div>

                  <div className="top-products-content">
                    <h3>
                      <a href="#">{item.title}</a>
                    </h3>
                    <ul className="rating">
                      <li>
                        <i className="bx bxs-star"></i>
                      </li>
                      <li>
                        <i className="bx bxs-star"></i>
                      </li>
                      <li>
                        <i className="bx bxs-star"></i>
                      </li>
                      <li>
                        <i className="bx bxs-star"></i>
                      </li>
                      <li>
                        <i className="bx bx-star"></i>
                      </li>
                    </ul>

                    <p className="mb-0">
                      {item.discount == "0" ? (
                        <p>${item.price}</p>
                      ) : (
                        <s>${item.price}</s>
                      )}
                    </p>
                    <p className={`${item.discount == "0" && "d-none"}`}>
                      ${item.off_price}
                    </p>
                  </div>
                  <div
                    className={` ${item?.discount == "0" && "d-none"} discount`}
                  >
                    <i class="bx bxs-badge">
                      <span>{item?.discount}%</span>
                    </i>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default NewProducts;
