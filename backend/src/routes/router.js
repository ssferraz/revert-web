const router = require("express").Router()

const usersRouter = require("./users");

router.use("/", usersRouter)

router.get('/', (_,res)=>{
    res.status(200).send({
        title: process.env.DB_NAME,
        version: "0.0.1"
    });
});

module.exports = router;