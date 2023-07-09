// "project" routerını buraya yazın!
const router = require("express").Router();
const projectModel = require("./projects-model");
const mw = require("./projects-middleware");

router.get("/", async (req, res, next) => {
    try {
        const projects = await projectModel.get();
        res.json(projects);
    } catch (error) {
        next(error);
    }
} );

module.exports = router;