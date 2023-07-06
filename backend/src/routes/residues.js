const router = require("express").Router()

const residueController = require("../controllers/residueController");

router.route("/residues").post((req, res) => residueController.create(req, res));
router.route("/residues").get((req, res) => residueController.getAll(req, res));
router.route("/residues/:id").get((req, res) => residueController.get(req, res));
router.route("/residues/:id?").delete((req, res) => {
    const residueId = req.params.id || req.query.id;
    residueController.delete(residueId, res);
});
router.route("/residues/:id").put((req, res) => {
    const residueId = req.params.id || req.query.id;
    residueController.update(residueId, req, res);
});

module.exports = router;