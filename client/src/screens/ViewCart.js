import React from "react";
import { removeFnFItem } from "../features/counter/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "../features/counter/cartSlice";

import "../css/viewcart.css";

function ViewCart(props) {
  const { itemsAdded, total, fnfItemAdded, fnfItemsTotal } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  return (
    <div className="body-container-vc">
      <div className="cartItemsContainer-vc">
        <h2
          style={{
            paddingBottom: "0.5em",
            borderBottom: "1px solid rgb(185, 185, 185)",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          My Cart
        </h2>

        {itemsAdded.map((item, index) => (
          <div key={index}>
            <div className="itemDisplay-vc">
              <div className="itemImg-vc">
                <img
                  src={require(`../shared/${item.images[0]}`)}
                  alt={item.id}
                ></img>
              </div>
              <div className="itemInfo-vc">
                <h2 className="productName-vc">{item.name}</h2>
                <h2 className="productPrice-vc">${item.priceInCad}</h2>
                <h2 className="productSize-vc">
                  size: {item.size.charAt(0).toUpperCase()}
                </h2>
                <div className="selectQuantity-vc">
                  {/* remove item */}
                  <button
                    className="selectBtns-vc"
                    onClick={() => {
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: -1,
                          priceInCad: item.priceInCad,
                          oldSize: item.size,
                        })
                      );
                    }}
                  >
                    <h2>-</h2>
                  </button>

                  {/* add item */}
                  <button className="selectBtns-vc">
                    <h2>{item.quantity}</h2>
                  </button>
                  <button
                    className="selectBtns-vc"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: 1,
                          priceInCad: item.priceInCad,
                          oldSize: item.size,
                        })
                      )
                    }
                  >
                    <h2>+</h2>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {fnfItemAdded.length > 0 &&
          fnfItemAdded.map((item, index) => (
            <FnFItem key={`${item}+${index}`} item={item} />
          ))}
      </div>

      <div className="price-list-vc">
        <h2
          style={{
            paddingBottom: "0.5em",
            borderBottom: "1px solid rgb(185, 185, 185)",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Order summary
        </h2>
        <div id="viewCart">
          <div className="subtotal-value-vc">
            <h4 className="h4-vc">Subtotal</h4>
            <h4 className="h4-vc">${total + fnfItemsTotal}</h4>
          </div>
          <button
            onClick={() => {
              // navigate("/checkout", { state: { checkoutTotal: (total+fnfItemsTotal) } });
              alert('dont worry about checkout')
            }}
            className="checkout-btn-vc"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

const FnFItem = (props) => {
  const dispatch = useDispatch();
  const { name, price, imagesCollection } = props.item;
  return (
    <div className="itemDisplay" style={{height:'inherit'}}>
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

export default ViewCart;
