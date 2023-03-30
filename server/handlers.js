"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();

const uuidv4 = require("uuidv4");
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

    const user = await db.collection("users").find().toArray();
   if (user) { res.status(200).json({
      status: 200,
      data: user
    })
  };
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
  client.close();
};

module.exports = { userInfo };
