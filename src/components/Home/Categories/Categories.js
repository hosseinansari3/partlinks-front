import React from "react";
import "./Categories.css";

function Categories() {
  return (
    <section className="categories-area pb-100">
      <div className="container">
        <div className="categories-box">
          <div className="categories-title">
            <h2>Popular Categories</h2>
          </div>

          <div className="categories-row">
            <div className="categories-item">
              <div className="single-categories">
                <div className="categories-image">
                  <a href="products-details.html">
                    <img
                      src="https://templates.hibootstrap.com/maxon/default/assets/img/categories/categories-1.jpg"
                      alt="image"
                    />
                  </a>
                </div>

                <div className="categories-content">
                  <h3>
                    <a href="products-details.html">17 Inch Rim</a>
                  </h3>
                </div>
              </div>
            </div>

            <div className="categories-item">
              <div className="single-categories">
                <div className="categories-image">
                  <a href="products-details.html">
                    <img
                      src="https://templates.hibootstrap.com/maxon/default/assets/img/categories/categories-2.jpg"
                      alt="image"
                    />
                  </a>
                </div>

                <div className="categories-content">
                  <h3>
                    <a href="products-details.html">Piston Ring</a>
                  </h3>
                </div>
              </div>
            </div>

            <div className="categories-item">
              <div className="single-categories">
                <div className="categories-image">
                  <a href="products-details.html">
                    <img
                      src="https://templates.hibootstrap.com/maxon/default/assets/img/categories/categories-3.jpg"
                      alt="image"
                    />
                  </a>
                </div>

                <div className="categories-content">
                  <h3>
                    <a href="products-details.html">Wheel</a>
                  </h3>
                </div>
              </div>
            </div>

            <div className="categories-item">
              <div className="single-categories">
                <div className="categories-image">
                  <a href="products-details.html">
                    <img
                      src="https://templates.hibootstrap.com/maxon/default/assets/img/categories/categories-4.jpg"
                      alt="image"
                    />
                  </a>
                </div>

                <div className="categories-content">
                  <h3>
                    <a href="products-details.html">HD Camera</a>
                  </h3>
                </div>
              </div>
            </div>

            <div className="categories-item">
              <div className="single-categories">
                <div className="categories-image">
                  <a href="products-details.html">
                    <img
                      src="https://templates.hibootstrap.com/maxon/default/assets/img/categories/categories-5.jpg"
                      alt="image"
                    />
                  </a>
                </div>

                <div className="categories-content">
                  <h3>
                    <a href="products-details.html">Rim</a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
