import React, { useContext } from "react";
import { Shopcontext } from "../../Context/Shopcontext";
import Remove_icon from "../Assets/cart_cross_icon.png";
import "../Cartitems/Cartitems.css";

function Cartitems() {
  const { gettotalcartamount, all_products, cartitem, removefromcart } =
    useContext(Shopcontext);
  return (
    <div className="cartitem">
      <div className="cartitem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Qantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_products.map((e) => {
        if (cartitem[e.id] > 0) {
          return (
            <div>
              <div className="cartitem-format cartitem-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitem-quantity">{cartitem[e.id]}</button>
                <p>${e.new_price * cartitem[e.id]}</p>
                <img
                  className="carticon-remove-icon"
                  onClick={() => {
                    removefromcart([e.id]);
                  }}
                  src={Remove_icon}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitem-down">
        <div className="cartitem-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitem-total-item">
              <p>SubTotal</p>
              <p>${gettotalcartamount()}</p>
            </div>
            <hr />
            <div className="cartitem-total-item">
              <p>Shiping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitem-total-item">
              <h3>Total</h3>
              <h3>${gettotalcartamount()}</h3>
            </div>
            <button>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cartitem-promocode">
            <p>If You Have A Promo code, enter It Here</p>
            <div className="cartitem-promobox">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartitems;
