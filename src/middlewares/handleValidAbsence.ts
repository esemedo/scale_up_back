import { body, param, query } from "express-validator";

function validId(nameParams){
    return [param(nameParams).notEmpty().isNumeric().toInt()]
} 

function validCreateAbsence(){
    return [
        body("startDate").notEmpty().isISO8601().withMessage("La date de début est invalide."), 
        body("endDate").notEmpty().isISO8601().withMessage("La date de fin est invalide."),
        body("reason").notEmpty().isString().trim().escape().withMessage("La raison est invalide."),
        body("substitutUserId").optional({ nullable: true }).isNumeric().toInt().withMessage("Le remplaçant est invalide.")
    ]

}
function validUpdateAbsence(){
    return [
    body("substitutUserId").notEmpty().isNumeric().toInt().withMessage("Le remplaçant est invalide.")
    ]

}




export {validId, validCreateAbsence,  validUpdateAbsence}