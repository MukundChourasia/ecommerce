const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const allowedOrigins = [
  'https://ecommerce-mu-umber.vercel.app/',
  "https://ecommerce-admin-drab-beta.vercel.app/"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

//database connection with Mongodb//

mongoose.connect(
  "mongodb+srv://mukund:mukund%40123@cluster0.4yjccda.mongodb.net/e-commerce"
);

//Api Creation//

app.get("/", (req, res) => {
  res.send("Express app is running");
});

//Image storage engine//

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//creating upload endpoint for images//
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//schema for creating products//

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});
//creating API for add product//

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let lastproduct_array = products.slice(-1);
    let lastproduct = lastproduct_array[0];
    id = lastproduct.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({ success: true, name: req.body.name });
});

//creating API for deleteing products//

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//creating API for getting allproducts//

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
});

// Scema Creating For User Model

const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating endpoint for reg the user

app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with same email address",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

//creating endpoint for user login

app.post("/login", async (req, res) => {
  let user = await Users.findOne({
    email: req.body.email,
  });
  if (user) {
    const passcompare = req.body.password === user.password;
    if (passcompare) {
      const data = { user: { id: user.id } };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: "wrong password" });
    }
  } else {
    res.json({ success: false, error: "Wrong Email Id" });
  }
});

//Creating endpoint for newcollection Data
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("NewCollection Fetched");
  res.send(newcollection);
});

//Creating endpoint for Populer In women section
app.get("/popularinwomen", async(req,res)=>{
  let products = await Product.find({category:"women"})
  let popular_in_women = products.slice(0,4)
  console.log("Populer in women fetched")
  res.send(popular_in_women)
})

//Creating Middleware to fetch user
const fetchUser = async (req,res,next)=>{
  const token = req.header("auth-token")
  if(!token){
    res.status(401).send({errors:"Please authanticat using valid token"})
  }
  else{
    try {
      const data = jwt.verify(token,"secret_ecom")
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({errors:"Please authanticat using valid token"})
    }
  }
}

//Creating endpoint for adding products in cart
app.post("/addtocart",fetchUser, async(req,res)=>{
  console.log("Added", req.body.itemId)
  let userData = await Users.findOne({_id:req.user.id})
  userData.cartData[req.body.itemId] +=1
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
  res.send("Added")
})

//Creating endpoint to remove product from cart data
app.post("/removefromcart", fetchUser, async(req,res)=>{
  console.log("Removed", req.body.itemId)
  let userData = await Users.findOne({_id:req.user.id})
  if(userData.cartData[req.body.itemId]>0)
  userData.cartData[req.body.itemId] -=1
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
  res.send("Removed")
})

//creating endpoint to get cartdata
app.post("/getcart",fetchUser,async(req,res)=>{
  console.log("Get Cart")
  let userData = await Users.findOne({_id:req.user.id})
  res.json(userData.cartData)
})

app.listen(port, (error) => {
  if (!error) {
    console.log("server running on port");
  } else {
    console.log("error : " + error);
  }
});
module.exports = app;