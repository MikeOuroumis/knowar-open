import { Router } from "express";
import * as roomController from "../controllers/roomController";

const router = Router();

router.post("/create-room", roomController.createRoom);
router.get("/active-rooms", roomController.activeRooms);

export default router;
