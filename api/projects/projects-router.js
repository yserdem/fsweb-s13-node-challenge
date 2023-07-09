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
});

router.get("/:id", mw.validateProjectID, async (req, res, next) => {
    try {
        res.json(req.validProjectID);
    } catch (error) {
        next(error);
    }
})

router.post("/", mw.validateProjectBody, async (req, res, next) => {
    let inserted = {
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed
    }
    try {
        const insertedProject = await projectModel.insert(inserted);
        res.status(201).json(insertedProject)
    } catch (error) {
        next(error);
    }
})

router.put("/:id", mw.validateProjectID, mw.validateProjectBody, async (req, res, next) => {
    let updated = {
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed
    }
    try {
        const updatedProject = await projectModel.update(req.params.id, updated);
        res.json(updated);
    } catch (error) {
        next(error);
    }
})

router.delete("/:id",mw.validateProjectId,async (req,res,next)=>{
    try {
        await projectModel.remove(req.params.id);
        res.json({message:"Silme işlemi başarılı"});
    } catch (error) {
        next(error);
    }
});

router.get("/:id/actions", mw.validateProjectId,async(req,res,next)=>{
    try {
        let projectActions = await projectModel.getProjectActions(req.params.id);
        res.json(projectActions);
    } catch (error) {
        next(error);
    }
});



module.exports = router;