import { Router } from "express";
import { body, param } from "express-validator";

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/CategoryController";
import { handleValidationErrors } from "../middlewares/handleValidator";

const router = Router();

router.get("/", getAllCategories);

router.post(
  "/",
  [
    body("name")
      .isLength({ min: 5, max: 20 })
      .withMessage(
        "La longueur doit être entre 5 et 20 caractères pour le name de la catégorie"
      )
      .bail()
      .trim()
      .escape(),
  ],
  handleValidationErrors,
  createCategory
);

router.put(
  "/:id",
  [
    param("id").isInt().withMessage(`L'id de la catégorie est invalide`),
    body("name")
      .isLength({ min: 5, max: 20 })
      .withMessage(
        "La longueur doit être entre 5 et 20 caractères pour le name de la catégorie"
      ),
  ],
  handleValidationErrors,
  updateCategory
);

router.delete(
  "/:id",
  [param("id").isInt().withMessage(`L'id de la catégorie est invalide`)],
  handleValidationErrors,
  deleteCategory
);
router.get(
  "/:id",
  [param("id").isInt().withMessage(`L'id de la catégorie est invalide`)],
  handleValidationErrors,
  getCategoryById
);

export default router;