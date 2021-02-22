const express = require("express");
const Category = require("../Models/CategoryModel");
const authenticate = require("../middleware/authenticate");
const restrictTo = require("../middleware/restrictTo");

const router = express.Router();


// Adding new Categories
router.post(
  "/add",
  authenticate,
  restrictTo("admin"),
  async (request, response) => {

    try {
      const { name, photo, description } = request.body;

      let data = await Category.findOne({ name });

      if (data) {
        return response.status(400).json({ msg: "Category already exist" });
      }

      const category = new Category({
        name,
        photo,
        description,
      });
      await category.save();

      response.send(`${name} Categeory have been created !!`);

    } catch (err) {
      console.log(err);
      response.send("server error");
    }
  }
);


// View all Categories
router.get("/view", async (request, response) => {
  try {
    const category = await Category.find({});
    if (!category) {
      return response.status(500).send({ msg: "Server error" });
    }
    response.send(category);
  } catch (error) {
    response.status(500).send({ msg: "Server error" });
  }
});


// Updating Categories
router.put(
  "/edit/:id",
  authenticate,
  restrictTo("admin"),
  async (request, response) => {
    const { name, photo, description } = request.body;
    const category = await Category.findByIdAndUpdate(
      { _id: request.params.id },
      { $set: { name, photo, description } }
    );

    if (category) {
      response.send(`The Category name have been updated !!`);
    } else {
      response.send("server error");
    }
  }
);


// Deleting Categories
router.delete(
  "/delete/:id",
  authenticate,
  restrictTo("admin"),
  async (request, response) => {
    const category = await Category.findByIdAndDelete({
      _id: request.params.id,
    });

    if (category) {
      response.send("Category have been Deleted!!");
    } else {
      response.send("server error");
    }
  }
);

module.exports = router;
