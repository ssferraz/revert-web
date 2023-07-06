const router = require("express").Router()

const categoryController = require("../controllers/categoryController");

router.route("/categories").post((req, res) => categoryController.create(req, res));
router.route("/categories").get((req, res) => categoryController.getAll(req, res));
router.route("/categories/:id").get((req, res) => categoryController.get(req, res));
router.route("/categories/:id?").delete((req, res) => {
    const categoryId = req.params.id || req.query.id;
    categoryController.delete(categoryId, res);
});
router.route("/categories/:id").put((req, res) => {
    const categoryId = req.params.id || req.query.id;
    categoryController.update(categoryId, req, res);
});

module.exports = router;