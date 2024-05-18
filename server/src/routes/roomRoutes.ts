import { Router } from "express";
import * as roomController from "../controllers/roomController";

const router = Router();

router.post("/", roomController.createRoom);
router.get("/active", roomController.activeRooms);

export default router;
