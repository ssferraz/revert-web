const router = require("express").Router()

const userController = require("../controllers/userController");

router.route("/users").post((req, res) => userController.create(req, res));
router.route("/users").get((req, res) => userController.getAll(req, res));
router.route("/users/:id").get((req, res) => userController.get(req, res));
router.route("/users/:id?").delete((req, res) => {
    const userId = req.params.id || req.query.id;
    userController.delete(userId, res);
});
router.route("/users/:id").put((req, res) => {
    const userId = req.params.id || req.query.id;
    userController.update(userId, req, res);
});
router.route("/users/authenticate").post((req, res) => userController.authenticate(req, res));

module.exports = router;