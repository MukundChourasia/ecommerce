import React, { useContext } from "react";
import "../Productdisplay/Productdisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { Shopcontext } from "../../Context/Shopcontext";
function Productdisplay(props) {
  const { product } = props;
  const { addtocart } = useContext(Shopcontext);
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-new-price">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-display">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet at
          inventore, cum nesciunt tempora iure neque quam labore commodi rerum,
          reprehenderit aperiam incidunt quasi quod deserunt tenetur deleniti
          impedit atque?
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button
          onClick={() => {
            addtocart(product.id);
          }}
        >
          ADD TO CART
        </button>
        <p className="productdisplay-right-category">
          <span>Category :</span> Women, T-shirt, Crop-Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span> Morden, Latest
        </p>
      </div>
    </div>
  );
}

export default Productdisplay;
