const router = require("express").Router()

const collectionPointController = require("../controllers/collectionPointController");

router.route("/collectionPoints").post((req, res) => collectionPointController.create(req, res));
router.route("/collectionPoints").get((req, res) => collectionPointController.getAll(req, res));
router.route("/collectionPoints/:id").get((req, res) => collectionPointController.get(req, res));
router.route("/collectionPoints/:id?").delete((req, res) => {
    const collectionPointId = req.params.id || req.query.id;
    collectionPointController.delete(collectionPointId, res);
});
router.route("/collectionPoints/:id?").put((req, res) => {
    const collectionPointId = req.params.id || req.query.id;
    collectionPointController.update(collectionPointId, req, res);
});

module.exports = router;