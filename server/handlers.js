"use strict";
const { MongoClient } = require("mongodb");
const { uuid } = require("uuidv4");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//***ADD A SINGLE USER TO MONGO */
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

//**** GET A SINGLE USER */
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

//**** GET ALL THE COMMENTS  */
const getComments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const { place_id } = req.query;
    await client.connect();
    const db = client.db("trvl-up");

    const comments = await db
      .collection("users")
      .find({ place_id: place_id })
      .toArray();

    res.status(200).json({
      status: 200,
      data: comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "An error occurred, please try again later" });
  } finally {
    client.close(); // Move the client.close() call to the finally block to ensure it always gets called
  }
};

//**** UPDATE A COMMENT  -  REMOVE IT FROM THE ARRAY */
const updateComments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const { _id, email } = req.body;

    await client.connect();
    const db = client.db("trvl-up");

    // Use findOne to check if the user and comment exist
    const user = await db.collection("users").findOne({ email: email });
// console.log(user);
    if (!user) {
      return res.status(404).json({
        status: 404,
        data: "No matching user found",
      });
    }

    const existingComment = user.comments.find(
      (comment) => comment._id === _id
    );
console.log(existingComment);
    if (!existingComment) {
      return res.status(400).json({
        status: 400,
        data: "There's no comments for this restaurant",
      });
    }
    // Use updateOne to remove the comment from the comments array
    const updateResult = await db.collection("users").updateOne(
      { email: email },
      { $pull: { comments: { _id: _id } } }
    );

    // Check if the update was successful and return the appropriate response
    if (updateResult.modifiedCount === 1) {
      return res.json({
        status: 200,
        data: "Comment removed successfully",
      });
    } 
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: "Failed to remove comment",
    });
  } 
    client.close();
};

//**** ADD A NEW COMMENT TO A SPECIFIC RESTAURANT */
const handleComments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const { place_id } = req.params;
    await client.connect();
    const db = client.db("trvl-up");

    const { email, comments, createdAt, rating } = req.body;
    const userCommentsObject = {
      place_id,
      email,
      comments,
      createdAt,
      rating,
      _id: uuid(),
    };

    const existingUser = await db.collection("users").findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "user not found" });
    }

    // Check if user has already left a comment for this place_id
    const existingComment = existingUser.comments.find(
      (comment) => comment.place_id === place_id
    );
    if (existingComment) {
      return res
        .status(400)
        .json({
          status: 400,
          message: "user has already left a comment for this place",
        });
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
      image,
      price_level,
      isAvailable,
      date_added,
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
      image,
      place_id,
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
    const { email, place_id} = req.body;
    await client.connect();
    const db = client.db("trvl-up");
    
    const user = await db.collection("users").findOne({ email: email });
    
    if (!user) {
      return res
      .status(400)
      .json({ status: 400, data: "This user doesn't exist" });
    }
    
    const existingFavorite = user.favorites.find(
      (favorite) => favorite.place_id === place_id
      );
      console.log(existingFavorite);

    if (!existingFavorite) {
      return res.status(400).json({
        status: 400,
        data: "This restaurant is not in your favorites",
      });
    }

      // Remove the restaurant from the favorites array
      const removeResult = await db
        .collection("users")
        .updateOne(
          { email: email },
          { $pull: { favorites: { place_id: place_id } } }
        );
      if (removeResult.modifiedCount === 1) {
        return res.json({
          status: 200,
          data: "Favorite restaurant updated successfully",
          "successful update": removeResult.modifiedCount,
        });
      } else {
        return res
          .status(500)
          .json({ status: 500, data: "Failed to update favorite restaurant" });
      } 
    
  }catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: 500, message: "Failed to update favorite restaurant" });
  } 
    client.close();
  
};

module.exports = {
  addRestaurant,
  updateFavorite,
  favorites,
  handleUsers,
  getSingleUser,
  handleComments,
  getComments,
  updateComments
};
