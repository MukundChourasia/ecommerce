import React, { useContext, useEffect } from "react";
import "./Css/Shopcategory.css";
import { Shopcontext } from "../Context/Shopcontext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Items/Item";
function Shopcategory(props) {
  const { all_products } = useContext(Shopcontext);
  console.log(all_products);
  useEffect(() => {}, []);
  return (
    <div className="shop-category">
      <img className="shop-category-banner" src={props.banner} alt="" />
      <div className="shop-category-indexsort">
        <p>
          <span>Showing 1-12</span> Out Of 36 product
        </p>
        <div className="shop-category-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shop-category-products">
        {all_products.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shop-category-lodemore">Explore More</div>
    </div>
  );
}

export default Shopcategory;
