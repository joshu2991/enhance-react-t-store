import React from "react";
import { useDispatch } from "react-redux";
import {
  removeFnFItem,
} from "../features/counter/cartSlice";

const FnFItem = (props) => {
  const dispatch = useDispatch();
  const { name, price, imagesCollection } = props.item;
  return (
    <div className="itemDisplay">
      <div className="itemImg">
        <img
          alt={imagesCollection.items[0].title}
          src={imagesCollection.items[0].url}
        ></img>
      </div>
      <div className="itemInfo">
        <h2 className="productName">{name}</h2>
        <h2 className="productPrice">${price}</h2>
        {/* <h2 className="productSize">size: {size.charAt(0).toUpperCase()}</h2> */}
        <div className="selectQuantity">
          <button
            className="selectBtns removeFnfBtn"
            onClick={() => {
              dispatch(removeFnFItem({ itemToRemove: props.item }));
            }}
          >
            <h2>Remove</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FnFItem;
