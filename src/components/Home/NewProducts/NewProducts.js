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
              <div className="col-lg-4 col-sm-6">
                <div className="single-top-products">
                  <div className="top-products-image">
                    <a href="products-details.html">
                      <img
                        src={`https://partlinks.com.au/${item.image}`}
                        alt="image"
                      />
                    </a>

                    <ul className="top-products-action">
                      <li>
                        <a href="cart.html">
                          <i className="flaticon-shopping-cart"></i>
                        </a>
                      </li>
                      <li>
                        <a href="wishlist.html">
                          <i className="flaticon-heart"></i>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="top-products-content">
                    <h3>
                      <a href="products-details.html">{item.title}</a>
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
                    <span>${item.price}</span>
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
