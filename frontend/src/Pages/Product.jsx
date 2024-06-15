import React, { useContext } from "react";
import { Shopcontext } from "../Context/Shopcontext";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import Productdisplay from "../Components/Productdisplay/Productdisplay";
import Descriptionbox from "../Components/Descriptionbox/Descriptionbox";
import Relatedproduct from "../Components/Relatedproduct/Relatedproduct";

function Product() {
  const { all_products } = useContext(Shopcontext);
  const { productId } = useParams();
  const product = all_products.find((e) => e.id === Number(productId));
  if(!product){
    console.log("Product Not Found")
    return("Product Not Found")
  }
  return (
    <div>
      <Breadcrum product={product} />
      <Productdisplay product={product} />
      <Descriptionbox />
      <Relatedproduct />
    </div>
  );
}

export default Product;
