import React from "react";
import "../Relatedproduct/Relatedproduct.css";
import data_product from "../Assets/data";
import Item from "../Items/Item";

function Relatedproduct() {
  return (
    <div className="relatedproduct">
      <h1>Related Product</h1>
      <hr />
      <div className="related-product-item">
        {data_product.map((item, i) => {
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
        })}
      </div>
    </div>
  );
}

export default Relatedproduct;
