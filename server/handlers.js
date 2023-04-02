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

//***** ADD RESTAURANT TO FAVORITE ******/
const addRestaurant = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("trvl-up");

    // this verifies that the user exist
    const userEmail = req.body
    const findUser = await db.collection("users").findOne({ _id: userEmail });
    if (!findUser) {
      return res.status(400).json({ status: 400, data: "This user doesn't exist" });
    }

    // this updates the restaurant if its already exist in the user's profile
    if (findUser) {
      const query = { _id: userEmail };
      const update = {
        $set: {restaurant: restaurant.name },
      };

    // this adds new restaurant to the favorites and updates it
    const newRestaurant= await db.collection("users").insertOne(req.body);

    res.status(200).json({
      status: 200,
      message: "New restaurant added to favorites",
    });
  }} catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
  client.close();
};

//***** DELETE RESTAURANT FROM FAVORITE ******/
const deleteRestaurant = (req,res) => {

}

//***** UPDATE RESTAURANT'S FAVORITE ******/
const updateFavorite = (req,res) => {

}
module.exports = { userInfo, country, addRestaurant, deleteRestaurant, updateFavorite };
