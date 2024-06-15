import React from "react";
import "./Newslatter.css";

function Newslatter() {
  return (
    <div className="newslatter">
      <h1>Get Exclusive offer on your Email</h1>
      <p>Subscribe to our NewsLatter and stay updated</p>
      <div>
        <input type="Email" placeholder="Your Email Id" />
        <button>Subscribe</button>
      </div>
    </div>
  );
}

export default Newslatter;
