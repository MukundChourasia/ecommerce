import React, { useState } from "react";
import "../Addproduct/Addproduct.css";
import uploadarea from "../../Assets/upload_area.svg";

function Addproduct() {
  const [image, setimage] = useState(false);
  const [productdetail, setproductdetail] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const imagehandler = (e) => {
    setimage(e.target.files[0]);
  };

  const changehandler = (e) => {
    setproductdetail({ ...productdetail, [e.target.name]: e.target.value });
  };

  const add_product = async () => {
    console.log(productdetail);
    let responsedata;
    let product = productdetail;

    let formData = new FormData(); // Corrected typo

    formData.append("product", image);
    await fetch("http://localhost:4000/upload", {
      // Corrected URL
      method: "post",
      headers: {
        accept: "application/json",
      },
      body: formData, // Corrected variable name
    })
      .then((resp) => resp.json()) // Corrected method name
      .then((data) => {
        // Corrected variable name
        responsedata = data;
      });

    if (responsedata.success) {
      // Corrected variable name
      product.image = responsedata.image_url; // Corrected variable name
      console.log(product);
      await fetch("http://localhost:4000/addproduct", {
        method: "post",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Failed");
        });
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-item-field">
        <p>Product Title</p>
        <input
          value={productdetail.name}
          onChange={changehandler}
          type="text"
          name="name"
          placeholder="Type Here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-item-field">
          <p>Price</p>
          <input
            value={productdetail.old_price}
            onChange={changehandler}
            type="text"
            name="old_price"
            placeholder="Type Here"
          />
        </div>
        <div className="addproduct-item-field">
          <p>Offer Price</p>
          <input
            value={productdetail.new_price}
            onChange={changehandler}
            type="text"
            name="new_price"
            placeholder="Type Here"
          />
        </div>
        <div className="addproduct-item-field">
          <p>Product Category</p>
          <select
            value={productdetail.category}
            onChange={changehandler}
            name="category"
            className="addproduct-selector"
          >
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Kid">Kid</option>
          </select>
        </div>
        <div className="addproduct-item-field">
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : uploadarea}
              alt=""
              className="addproduct-thumnail-image"
            />
          </label>
          <input
            onChange={imagehandler}
            type="file"
            name="image"
            id="file-input"
            hidden
          />
        </div>
        <button
          onClick={() => {
            add_product();
          }}
          className="addproduct-btn"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Addproduct;
