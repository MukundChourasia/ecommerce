import React, { createContext, useEffect, useState } from "react";

export const Shopcontext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_products, setAll_Products] = useState([]);
  const [cartitem, setcartitem] = useState(getDefaultCart());

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAll_Products(data); // Assuming setItems is a state update function
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      if(localStorage.getItem("auth-token")){
        fetch("http://localhost:4000/getcart",{
          method:"POST",
          headers:{
            Accept:"application/form-data" ,
            "auth-token":`${localStorage.getItem("auth-token")}`,
            'Content-Type':'application/json',
          },
          body:""
        })
        .then((response)=>response.json())
        .then((data)=>setcartitem(data))
      }
  }, []);

  const addtocart = (itemId) => {
    setcartitem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if(localStorage.getItem('auth-token')){
      fetch("http://localhost:4000/addtocart",{
        method:"POST",
        headers:{
          Accept:'application/form-data',
          "auth-token":`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId}),

      })
      .then((response)=>response.json())
      .then((data)=>console.log(data))
    }
  };

  const removefromcart = (itemId) => {
    setcartitem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if(localStorage.getItem("auth-token")){
      fetch("http://localhost:4000/removefromcart",{
        method:"POST",
        headers:{
          Accept:'application/form-data',
          "auth-token":`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId}),

      })
    }
  };

  const gettotalcartamount = () => {
    let totalamount = 0;
    for (const item in cartitem) {
      if (cartitem[item] > 0) {
        const iteminfo = all_products.find(
          (product) => product.id === Number(item)
        );
        totalamount += iteminfo.new_price * cartitem[item];
      }
    }
    return totalamount;
  };

  const gettotalcartitem = () => {
    let totalitem = 0;
    for (const item in cartitem) {
      if (cartitem[item] > 0) {
        totalitem += cartitem[item];
      }
    }
    return totalitem;
  };

  const contextValue = {
    gettotalcartitem,
    gettotalcartamount,
    all_products,
    cartitem,
    addtocart,
    removefromcart,
  };
  return (
    <Shopcontext.Provider value={contextValue}>
      {props.children}
    </Shopcontext.Provider>
  );
};

export default ShopContextProvider;
