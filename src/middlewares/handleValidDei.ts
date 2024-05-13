import { param, query } from "express-validator";

function validId(nameParams){
    return [param(nameParams).notEmpty().isNumeric().toInt()]
} 

export {validId}