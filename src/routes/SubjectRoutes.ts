import { Router } from "express";
import { body, param } from "express-validator";
import {
  createSubject,
  deleteSubject,
  getAllSubjects,
  getSubjectsByCategoryId,
  getSubjectsById,
  updateSubject,
} from "../controllers/SubjectController";
import { handleValidationErrors } from "../middlewares/handleValidator";

const router = Router();

router.get("/", getAllSubjects);
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Le nom est obligatoire"),
    body("name")
      .isLength({ min: 5, max: 20 })
      .withMessage(
        "La longueur doit être entre 5 et 20 caractères pour le name de la matière/module"
      ),
    body("level").notEmpty().withMessage("Le level est obligatoire"),
    body("level").isInt().withMessage(`Le level n'est pas un chiffre.`),
    body("categoryId").isInt().withMessage(`L'id de la catégorie est invalide`),
  ],
  handleValidationErrors,
  createSubject
);

router.put(
  "/:id",
  [
    param("id").isInt().withMessage(`L'id de la matière est invalide`),
    body("name").notEmpty().withMessage("Le nom est obligatoire"),
    body("name")
      .isLength({ min: 5, max: 20 })
      .withMessage(
        "La longueur doit être entre 5 et 20 caractères pour le name de la catégorie"
      ),
    body("level").notEmpty().withMessage("Le level est obligatoire"),
    body("level").isInt().withMessage(`Le level n'est pas un chiffre.`),
    body("categoryId").isInt().withMessage(`L'id de la catégorie est invalide`),
  ],
  handleValidationErrors,
  updateSubject
);

router.delete(
  "/:id",
  [param("id").isInt().withMessage(`L'id de la matière/module est incorrect`)],
  handleValidationErrors,
  deleteSubject
);

router.get(
  "/:id",
  [param("id").isInt().withMessage(`L'id de la matière/module est incorrect`)],
  handleValidationErrors,
  getSubjectsById
);

router.get(
  "/category/:id",
  [
    param("id")
      .isInt()
      .withMessage(`Aucune matière n'a cette catégorie si elle existe`),
  ],
  handleValidationErrors,
  getSubjectsByCategoryId
);

export default router;
