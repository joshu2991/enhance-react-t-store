import React from "react";
import "./CommonButton.css";
function CommonButton({ title = "somebutton", onClickHandler }) {
  return (
    <div className="">
      <button className="button-cart-buy" onClick={onClickHandler}>
        {title}
      </button>
    </div>
  );
}

export default CommonButton;
