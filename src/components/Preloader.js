import React from "react";
import "./Preloader.css";

function Preloader({ diplay }) {
  return (
    <div className={`${diplay ? "d-block" : "d-none"} preloader`}>
      <div className="loader">
        <div className="sbl-half-circle-spin">
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
