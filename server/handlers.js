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

// // Get a single destination to render in your profile
// const country = async (req, res) => {
//   const client = new MongoClient(MONGO_URI, options);
//   try {
//     await client.connect();
//     const db = client.db("trvl-up");
//     const country = req.params;

//     const destination = await db
//       .collection("users")
//       .findOne({ country: country });

//     if (destination) {
//       res.status(200).json({
//         status: 200,
//         data: destination,
//       });
//     } else {
//       res.status(400).json({ status: 400, message: "Nothing was found here" });
//     }
//   } catch (error) {
//     res.status(500).json({ status: 500, message: error });
//   }
//   client.close();
// };

//find all the favorite restaurants
const favorites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {

    // accessing the body
    const place_id = req.body.place_id;

    await client.connect();
    const db = client.db("trvl-up");

    const restaurants = await db
      .collection("users")
      .findOne({place_id:place_id});

    if (restaurants) {
      res.status(200).json({
        status: 200,
        data: restaurants,
      });
    } else {
      res.status(400).json({ status: 400, message: "Nothing was found here" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
  client.close();
}

//***** ADD RESTAURANT TO FAVORITE ******/
const addRestaurant = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    // accessing the body
    const name = req.body.name;
    const address = req.body.address;
    const rating = req.body.rating;
    const email = req.body.email;
    const place_id = req.body.place_id;
    const isAvailable = req.body.isAvailable

    const db = client.db("trvl-up");

    // Verify that the user exists
    const user = await db.collection("users").findOne({ _id: email });

    if (!user) {
      return res
        .status(400)
        .json({ status: 400, data: "This user doesn't exist" });
    }

    const newFavorite = {
      name: name,
      address: address,
      rating: rating,
      place_id: place_id,
      isAvailable:isAvailable
    };

    // Check if the restaurant already exists in the "favorites" array of the user
    const existingFavorite = user.favorites.find(
      (favorite) => favorite.place_id === place_id
    );

    if (existingFavorite) {
      return res
        .status(400)
        .json({ status: 400, data: "This restaurant is already a favorite" });
    }

    // Add the new favorite to the user's favorites array
    user.favorites.push(newFavorite);

    // Update the user's profile with the new favorites array
    const updatedUser = await db
      .collection("users")
      .updateOne({ email: email }, { $set: { favorites: user.favorites } });

    res.status(200).json({
      status: 200,
      data: updatedUser,
      message: "New restaurant added to favorites",
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  } finally {
    client.close();
  }
};

//***** UPDATE RESTAURANT'S FAVORITE ******/
const updateFavorite = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const { email, place_id, isAvailable } = req.body;

    await client.connect();
    const db = client.db("trvl-up");

    const user = await db.collection("users").findOne({ _id: email });

    if (!user) {
      return res
        .status(400)
        .json({ status: 400, data: "This user doesn't exist" });
    }

    const existingFavorite = user.favorites.find(
      (favorite) => favorite.place_id === place_id
    );

    if (!existingFavorite) {
      return res
        .status(400)
        .json({ status: 400, data: "This restaurant is not in your favorites" });
    }

    const updateResult = await db.collection("users").updateOne(
      { _id: email, "favorites.place_id": place_id },
      { $set: { "favorites.$.isAvailable": true } }
    );

    if (updateResult.modifiedCount === 1) {
      return res.json({ status: 200, data: "Favorite restaurant updated successfully", "successfull update ": updateResult.modifiedCount});
    } else {
      return res.status(500).json({ status: 500, data: "Failed to update favorite restaurant" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Failed to update favorite restaurant" });
  } 
    client.close();
  
};

module.exports = {
  userInfo,
  addRestaurant,
  updateFavorite,
  favorites
};
