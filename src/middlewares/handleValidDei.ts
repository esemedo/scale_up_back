import { body, param, query } from "express-validator";

function validId(nameParams){
    return [param(nameParams).notEmpty().isNumeric().toInt()]
} 
function validQuery (nameQuery){
    return [query(nameQuery).optional().notEmpty().isNumeric().toInt()]
} 
function validBody(nameParams,nameBody){
    return [...validId(nameParams),body(nameBody).notEmpty().isNumeric().toInt()]

}


export {validId, validBody, validQuery}