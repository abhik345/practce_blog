import {
    createUserController,
    getUsersController,
    getUserByIdController,
    getUserByEmailController,
    updateUserByIdController, loginController
} from "./users.controller.js";
import express from "express";

const router = express.Router();

router.post("/create",createUserController);
router.get("/get-users",getUsersController);
router.get("/get-users/:user_id",getUserByIdController);
router.get("/get-users-email",getUserByEmailController);
router.patch("/update-user/:user_id",updateUserByIdController);
router.post("/login",loginController);
export default router
