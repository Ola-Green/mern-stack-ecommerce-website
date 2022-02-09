const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const Product = require("../models/product");

module.exports = {
  createCategory: asyncHandler(async (req, res) => {
    const category = new Category({
      title: "Sample title",
      cat: "Sample name",
      user: req.user._id,
      image: "/images/sample.jpg",
    });

    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  }),

  getCategories: asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Category.countDocuments({ ...keyword });
    const categories = await Category.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ categories, page, pages: Math.ceil(count / pageSize) });
  }),

  updateCategory: asyncHandler(async (req, res) => {
    const { title, cat, image } = req.body;

    const category = await Category.findById(req.params.id);

    if (category) {
      category.title = title;
      category.cat = cat;
      category.image = image;

      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404);
      throw new Error("category not found");
    }
  }),

  deleteCategory: async (req, res) => {
    try {
      const product = await Product.findOne({ category: req.params.id });
      if (product) {
        return res
          .status(400)
          .json({ message: "please delete all products related" });
      }

      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: "category deleted successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (category) {
        res.json(category);
      }
    } catch (err) {
      res.status(500).json({ message: "category was not found" });
    }
  },

  listCategory: async (req, res) => {
    try {
      const categories = await Category.find({}).sort({title:1});
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};
