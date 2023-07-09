// "eylem" routerını buraya yazın
const router = require("express").Router();
const actionsModel = require("./actions-model");
const mw = require("./actions-middlware");

router.get("/",async (req,res,next)=>{
    try {
        const allActions = await actionsModel.get();
        res.json(allActions);
    } catch (error) {
        next(error);
    }
});
router.get("/:id",mw.validateActionID,async (req,res,next)=>{
    try {
        res.json(req.validAction);
    } catch (error) {
        next(error);
    }
});
router.post("/",mw.validateActionBody, async (req,res,next)=>{
    try {
        let actionModel = {
            project_id: req.body.project_id,
            description: req.body.description,
            notes: req.body.notes,
            completed: req.body.completed
        }
      const insertedAction = await actionsModel.insert(actionModel)
      res.status(201).json(insertedAction);
    } catch (error) {
        next(error);
    }
});
router.put("/:id",mw.validateActionID,mw.validateActionBody,async (req,res,next)=>{
    try {
        let actionModel = {
            project_id: req.body.project_id,
            description: req.body.description,
            notes: req.body.notes,
            completed: req.body.completed
        }
        const updatedAction = await actionsModel.update(req.params.id,actionModel);
        res.json(updatedAction);
    } catch (error) {
        next(error);
    }
});
router.delete("/:id",mw.validateActionID,async (req,res,next)=>{
    try {
        await actionsModel.remove(req.params.id);
        res.json({message:"Silme işlemi başarılı"});
    } catch (error) {
        next(error);
    }
});



module.exports = router;