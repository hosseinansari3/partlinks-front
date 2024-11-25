import React from "react";
import "./Preloader.css";

function Preloader({ display }) {
  return (
    <div className={`${display ? "d-block" : "d-none"} preloader`}>
      <div className="loader">
        <div className="sbl-half-circle-spin">
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
