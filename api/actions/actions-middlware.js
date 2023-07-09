// eylemlerle ilgili ara katman yazılımları yazın
const actionsModel = require("./actions-model");

const validateActionID = async (req, res, next) => {
    try {
        const isValidID = await actionsModel.get(req.params.id);
        if (!isValidID) {
            res.status(404).json({message:"project not found"});
        } else {
            req.validActionID = isValidID;
            next();
        } 
    } catch (error) {
        next(error);
    }
}

const validateActionBody = async (req, res, next) => {
    try {
        const {projectID, description, notes} = req.body;
        if (!projectID || !description || !notes){
            res.status(400).json({message:"missing fields"});
        }else {
            next();
        }
    } catch (error){
        next(error);
    }
};

module.exports = {
    validateActionBody,
    validateActionID
}
