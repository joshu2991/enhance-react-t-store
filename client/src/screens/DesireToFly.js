import React, { useRef, useState } from "react";
import CommonButton from "../components/CommonButton";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/productDisp.css";
import "rodal/lib/rodal.css";
import ProductDetail from "../components/ProductDetail/ProductDetail";

function DesireToFly({scrollToSection, detailRef}) {

  return (
    <div id="parent-div" className="parent-parent">
      <div className="displayProductContents">
        <section className="video-container" style={{ height: "100vh" }}>
          <div className="titleContainer">
            <h2 className="title">Desire To Fly</h2>

            <div className="btnContainer">
              <CommonButton title="Shop Now" onClickHandler={scrollToSection}/>
            </div>
          </div>
          <img src="dtfnew.jpg" className="newImg" alt="new dtf img"></img>

        </section>

        <div className="carousel-container">

          <ProductDetail productId="dtf" detailRef={detailRef}/>

        </div>
      </div>
    </div>
  );
}

export default DesireToFly;
