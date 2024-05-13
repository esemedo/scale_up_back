import { query } from "express-validator";

function validId(nameParams){
    query(nameParams).notEmpty().isNumeric().toInt()
} 

export {validId}