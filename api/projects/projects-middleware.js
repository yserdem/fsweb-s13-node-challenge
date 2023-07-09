// projects ara yazılımları buraya
const projectsModel = require("./projects-model");

const validateProjectID = async (req, res, next) => {
    try {
        const isValidID = await projectsModel.get(req.params.id);
        if (!isValidID) {
            res.status(404).json({message:"project not found"});
        } else {
            req.validProjectID = isValidID;
            next();
        } 
    } catch (error) {
        next(error);
    }
}

const validateProjectBody = async (req, res, next) => {
    try {
        const {name,description, completed} = req.body;
        if (!name || !description || !completed){
            res.status(400).json({message:"missing fields"});
        }else {
            next();
        }
    } catch (error){
        next(error);
    }
};

module.exports = {
    validateProjectBody,
    validateProjectID
}
