const router = require("express").Router();
const { protect, admin } = require("../middleware/authMiddleware");
const categoryController = require("../controllers/category");

router
  .route("/category")
  .get(categoryController.getCategories)
  .post(protect, admin, categoryController.createCategory);

router
  .route("/category/:id")
  .get(categoryController.getCategoryById)
  .delete(protect, admin, categoryController.deleteCategory)
  .put(protect, admin, categoryController.updateCategory);
router.get("/listcategory", categoryController.listCategory);

module.exports = router;
