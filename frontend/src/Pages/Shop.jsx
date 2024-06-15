import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import Newcollections from "../Components/Newcollections/Newcollections";
import Newslatter from "../Components/Newslatter/Newslatter";

function Shop() {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <Newcollections />
      <Newslatter />
    </div>
  );
}

export default Shop;
