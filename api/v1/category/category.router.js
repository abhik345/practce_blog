import {createCategoryController, getCategoryController,updateCategoryByIdController,deleteCategoryByIdController} from "./category.controller.js";
import express from "express";

const router = express.Router();


router.post("/create",createCategoryController);
router.get("/get-category",getCategoryController);
router.patch("/update-category/:category_id",updateCategoryByIdController);
router.delete("/delete-category/:category_id",deleteCategoryByIdController)


export default router;