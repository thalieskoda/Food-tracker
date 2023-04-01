"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Get user's information profile
const userInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("trvl-up");

    const user = await db.collection("users").findOne();
    if (user) {
      res.status(200).json({
        status: 200,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
  client.close();
};

// Get a single destination to render in your profile
const country = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("trvl-up");
    const country = req.params;

    const destination = await db
      .collection("users")
      .findOne({ country: country });

    if (destination) {
      res.status(200).json({
        status: 200,
        data: destination,
      });
    } else{
      res
          .status(400)
          .json({ status: 400, message: "Nothing was found here" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
  client.close();
};


const addRestaurant = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("trvl-up");

    // this verifies that the item _id exist
    const itemId = Number(req.body._id);
    const findItem = await db.collection("users").findOne({ _id: itemId });
    if (!findItem) {
      return res.status(400).json({ status: 400, data: "Item doesn't exist" });
    }
    // this verifies that the item is in stock
    if (findItem.numInStock < req.body.quantity) {
      return res.status(400).json({ status: 400, data: "Item not in stock" });
    }

    // this checks if item already exist in cart
    const findCart = await db.collection("cart").find().toArray();
    const itemFind = findCart.find((item) => {
      return item._id === itemId;
    });

    // this updates quantity if item already exist in cart and updates stock as well
    if (itemFind) {
      const query = { _id: itemId };
      const update = {
        $set: { quantity: itemFind.quantity + Number(req.body.quantity) },
      };
      const updateQuantity = await db
        .collection("cart")
        .updateOne(query, update);

      const query2 = { _id: itemId };
      const update2 = {
        $set: { numInStock: findItem.numInStock - Number(req.body.quantity) },
      };
      const itemStockUpdate = await db
        .collection("items")
        .updateOne(query2, update2);

      return res.status(200).json({
        status: 200,
        message: "Cart has been updated",
      });
    }

    // this adds new item to cart and updates stock
    const newAddToCart = await db.collection("cart").insertOne(req.body);

    const query1 = { _id: itemId };
    const update1 = {
      $set: { numInStock: findItem.numInStock - Number(req.body.quantity) },
    };

    const itemStockUpdate = await db
      .collection("items")
      .updateOne(query1, update1);
    ///////////////

    res.status(200).json({
      status: 200,
      message: "New item added to cart",
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
    client.close();
  }
  client.close();
};

module.exports = { userInfo, country, addRestaurant };
