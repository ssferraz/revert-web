const router = require("express").Router()

const collectionOrderController = require("../controllers/collectionOrderController");

router.route("/collectionOrders").post((req, res) => collectionOrderController.create(req, res));
router.route("/collectionOrders").get((req, res) => collectionOrderController.getAll(req, res));
router.route("/collectionOrders/:id").get((req, res) => collectionOrderController.get(req, res));
router.route("/collectionOrders/:id?").delete((req, res) => {
    const collectionOrderId = req.params.id || req.query.id;
    collectionOrderController.delete(collectionOrderId, res);
});
router.route("/collectionOrders/:id").put((req, res) => {
    const collectionOrderId = req.params.id || req.query.id;
    collectionOrderController.update(collectionOrderId, req, res);
});

module.exports = router;