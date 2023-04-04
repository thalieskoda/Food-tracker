"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//**** GET THE USER'S INFORMATION */
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

const handleUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("trvl-up");

    const existingUser = await db
      .collection("users")
      .findOne({ email: req.body.email });

    if (!existingUser) {
      await db
        .collection("users")
        .insertOne({ ...req.body, favorites: [], comments: [] });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "user already exists" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
  client.close();
};

const getSingleUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const { email } = req.params;
    await client.connect();
    const db = client.db("trvl-up");

    const existingUser = await db.collection("users").findOne({ email });

    return res.status(200).json({ status: 200, data: existingUser });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
  client.close();
};

const handleComments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const { place_id } = req.params;
    await client.connect();
    const db = client.db("trvl-up");

    const { email, comments } = req.body;
    const userCommentsObject = {
      place_id,
      email,
      comments,
    };

    const existingUser = await db.collection("users").findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "user not found" });
    }

    existingUser.comments.push(userCommentsObject);

    await db
      .collection("users")
      .updateOne({ email }, { $set: { comments: existingUser.comments } });

    return res.status(200).json({ status: 200, message: "comments added" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
  client.close();
};

//***GET ALL THE USER'S FAVORITES */
const favorites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    // accessing the body
    const place_id = req.body.place_id;

    await client.connect();
    const db = client.db("trvl-up");

    const restaurants = await db
      .collection("users")
      .findOne({ place_id: place_id });

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
};

//***** ADD RESTAURANT TO FAVORITE ******/
const addRestaurant = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    // accessing the body
    const {
      name,
      address,
      rating,
      email,
      place_id,
      photos,
      price_level,
      isAvailable,
      date_added,
      icon
    } = req.body;

    const db = client.db("trvl-up");

    // Verify that the user exists
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ status: 400, data: "This user doesn't exist" });
    }

    const newFavorite = {
      name,
      address,
      rating,
      price_level,
      photos,
      place_id,
      icon,
      isAvailable,
      date_added,
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
      .updateOne({ email }, { $set: { favorites: user.favorites } });

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
      return res.status(400).json({
        status: 400,
        data: "This restaurant is not in your favorites",
      });
    }

    const updateResult = await db
      .collection("users")
      .updateOne(
        { _id: email, "favorites.place_id": place_id },
        { $set: { "favorites.$.isAvailable": true } }
      );

    if (updateResult.modifiedCount === 1) {
      // Remove the restaurant from the favorites array
      const removeResult = await db
        .collection("users")
        .updateOne(
          { _id: email },
          { $pull: { favorites: { place_id: place_id } } }
        );
      if (removeResult.modifiedCount === 1) {
        return res.json({
          status: 200,
          data: "Favorite restaurant updated successfully",
          "successful update": updateResult.modifiedCount,
        });
      } else {
        return res
          .status(500)
          .json({ status: 500, data: "Failed to update favorite restaurant" });
      }
    } else {
      return res
        .status(500)
        .json({ status: 500, data: "Failed to update favorite restaurant" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: 500, message: "Failed to update favorite restaurant" });
  } finally {
    client.close();
  }
};

const newComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    // accessing the body
    const comment = req.body.status;
    const email = req.body.email;
    const place_id = req.body.place_id;

    const db = client.db("trvl-up");

    // Verify that the user exists
    const user = await db.collection("users").findOne({ _id: email });

    if (!user) {
      return res
        .status(400)
        .json({ status: 400, data: "This user doesn't exist" });
    }

    ////Need to find the exacte place_id of the restaurant for the comment.
    const newCommentFromUser = {
      comment: comment,
    };

    // Add the new favorite to the user's favorites array
    user.favorites.push(newCommentFromUser);

    // Update the user's profile with the new favorites array
    const updatedUser = await db
      .collection("users")
      .updateOne({ email: email }, { $set: { favorites: user.favorites } });

    res.status(200).json({
      status: 200,
      data: updatedUser,
      message: "New comment was added to favorites",
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  } finally {
    client.close();
  }
};

module.exports = {
  userInfo,
  addRestaurant,
  updateFavorite,
  favorites,
  newComment,
  handleUsers,
  getSingleUser,
  handleComments,
};
