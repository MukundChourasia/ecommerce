import React from "react";
import "../Descriptionbox/Descriptionbox.css";
function Descriptionbox() {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews(122) </div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          voluptatibus, voluptates soluta saepe libero, voluptatum, hic harum
          nobis blanditiis facere consequatur. Dignissimos aspernatur eum quae
          quos rem aliquam accusantium doloremque?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          nam dolorum a est nemo error voluptate debitis pariatur animi
          expedita. Quisquam mollitia doloremque id nihil dicta sint nam veniam
          distinctio.
        </p>
      </div>
    </div>
  );
}

export default Descriptionbox;
