const router = require("express").Router()

const usersRouter = require("./users");
const residuesRouter = require("./residues");
const categoriesRouter = require("./categories");
const collectionOrdersRouter = require("./collectionOrders");
const collectionPointsRouter = require("./collectionPoints");

router.use("/", usersRouter);
router.use("/", residuesRouter);
router.use("/", categoriesRouter);
router.use("/", collectionOrdersRouter);
router.use("/", collectionPointsRouter);

router.get('/', (_,res)=>{
    res.status(200).send({
        title: process.env.DB_NAME,
        version: "0.0.1"
    });
});

module.exports = router;