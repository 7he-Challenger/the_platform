import React from "react";

// reactstrap components
import { Spinner } from "react-bootstrap";

// core components

export default function PageChange() {
  return (
    <div className="body-loader">
      <div className="loader">
        <p className="loader_txt">Loading...</p>
        <div className="loader_arc"></div>
        <div className="loader_rnd_container">
            <div className="loader_rnd"></div>
        </div>
      </div>
    </div>
  );
}
