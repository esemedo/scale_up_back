import { body, param, query } from "express-validator";

function validId(nameParams){
    return [param(nameParams).notEmpty().isNumeric().toInt()]
} 
function validQuery (nameQuery){
    return [query(nameQuery).optional().notEmpty().isNumeric().toInt()]
} 
function validBody(nameParams,nameBody){
    return [...validId(nameParams),body(nameBody).optional().notEmpty().isNumeric().toInt()]

}
function validFormData(){
    return [param("id").notEmpty().isNumeric().toInt(),body('priority').optional().notEmpty().toInt().withMessage("La priorité n'est pas valide !"), 
    body('sashaStatus').optional().notEmpty().toInt().withMessage("Le statut SACHA n'est pas valide !"), ]
}

export {validId, validBody, validQuery, validFormData}