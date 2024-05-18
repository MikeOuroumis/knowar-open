import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.loginUser);
router.delete("/delete-user", userController.deleteUser);

export default router;
