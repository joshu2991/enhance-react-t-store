import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import "./SidePanel.css";

import {
  setCartIsOpen,
  updateQuantity,
} from "../features/counter/cartSlice";
import { Link } from "react-router-dom";
import FnFItems from "./FnFItems";

function SidePanel(props) {
  const dispatch = useDispatch();
  const { itemsAdded, total, fnfItemsTotal } = useSelector(
    (state) => state.cart
  );
  const { fnfItemAdded } = useSelector((state) => state.cart);

  const hasItemsAdded = itemsAdded.length > 0;
  const hasFnfItemAdded = fnfItemAdded.length > 0;

  const combinedTotal = total + fnfItemsTotal;

  return (
    <section
      className={
        props.sidePanelOpen ? "sidePanel sidePanelActive " : "sidePanel"
      }
      ref={props.sidePanelRef}
    >
      <div className="cartTitle">
        <MdOutlineKeyboardArrowRight
          className="closeSidePanelBtn"
          size={30}
          onClick={() => dispatch(setCartIsOpen(false))}
        />
        <h2>Cart</h2>
      </div>

      {/* Display Items added to Cart */}
      {!hasItemsAdded && !hasFnfItemAdded ? (
        <div className="emptyCart">
          <h2 className="totalText">Cart is empty</h2>
        </div>
      ) : (
        <>
          {/* itemsAdded items */}
          {hasItemsAdded && (
            <div className="cartItemsContainer">
              {itemsAdded.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </div>
          )}

          {/* F&F items */}
          {hasFnfItemAdded && (
            <div className="cartItemsContainer">
              {fnfItemAdded.map((item, index) => (
                <FnFItems key={`${item}+${index}`} item={item} />
              ))}
            </div>
          )}
        </>
      )}

      {(itemsAdded.length > 0 || fnfItemAdded.length > 0) && (
        <div className="viewCartDiv">
          {/* Adjusted Cart Total Display */}
          <div className="subTotalDiv">
            <h2 className="totalText">Subtotal:</h2>
            <h2 className="totalText">${combinedTotal}</h2>
          </div>
          <Link
            to="/viewcart"
            className="viewCartDiv"
            onClick={() => dispatch(setCartIsOpen(false))}
          >
            <button className="viewCartBtn">View Cart</button>
          </Link>
        </div>
      )}
    </section>
  );
}

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { name, priceInCad, images, quantity, id, size } = props.item;
  return (
    <div className="itemDisplay">
      <div className="itemImg">
        {/* <img src={images[0]} alt={id}></img> */}
        <img src={require(`../shared/${images[0]}`)} alt={id}></img>
      </div>
      <div className="itemInfo">
        <h2 className="productName">{name}</h2>
        <h2 className="productPrice">${priceInCad}</h2>
        <h2 className="productSize">size: {size.charAt(0).toUpperCase()}</h2>
        <div className="selectQuantity">
          {/* remove item */}
          <button
            className="selectBtns"
            onClick={() => {
              dispatch(
                updateQuantity({
                  id: id,
                  quantity: -1,
                  priceInCad: priceInCad,
                  oldSize: size,
                })
              );
            }}
          >
            <h2>-</h2>
          </button>

          {/* add item btn */}
          <button className="selectBtns">
            <h2>{quantity}</h2>
          </button>
          <button
            className="selectBtns"
            onClick={() =>
              dispatch(
                updateQuantity({
                  id: id,
                  quantity: 1,
                  priceInCad: priceInCad,
                  oldSize: size,
                })
              )
            }
          >
            <h2>+</h2>
          </button>
        </div>
      </div>
    </div>
  );
};
/*
        BELOW IS MOVED TO  ITS OWN COMPONENT:
*/
// const FnFItem = (props) => {
//   const dispatch = useDispatch();
//   const { name, price, imagesCollection } = props.item;
//   return (
//     <div className="itemDisplay">
//       <div className="itemImg">
//         <img
//           alt={imagesCollection.items[0].title}
//           src={imagesCollection.items[0].url}
//         ></img>
//       </div>
//       <div className="itemInfo">
//         <h2 className="productName">{name}</h2>
//         <h2 className="productPrice">${price}</h2>
//         {/* <h2 className="productSize">size: {size.charAt(0).toUpperCase()}</h2> */}
//         <div className="selectQuantity">
//           <button
//             className="selectBtns removeFnfBtn"
//             onClick={() => {
//               dispatch(removeFnFItem({ itemToRemove: props.item }));
//             }}
//           >
//             <h2>Remove</h2>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default SidePanel;
