import React from "react";

function Overview() {
  return (
    <div className="overview-area pt-100 pb-70">
      <div className="container">
        <div className="overview-item">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-sm-6">
              <div className="overview-image">
                <img
                  src="https://theme.partlinks.com.au/assets/img/overview/overview-1.jpg"
                  alt="image"
                />
              </div>
            </div>

            <div className="col-lg-6 col-sm-6">
              <div className="overview-image">
                <img
                  src="https://theme.partlinks.com.au/assets/img/overview/overview-2.jpg"
                  alt="image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
