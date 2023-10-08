import { Request, Response } from "express";
import Room from "../models/Room";
import mongoose from "mongoose";

export const createRoom = async (req: Request, res: Response) => {
  const { category, userId } = req.body;

  const objectId = new mongoose.Types.ObjectId(userId);

  try {
    const room = new Room({
      category: category,
      host: objectId,
      players: [objectId],
    });

    await room.save();
    res.send({ status: "ok", roomId: room._id });
  } catch (error) {
    const typedError = error as Error;
    console.error(typedError);
    res.status(500).send({ status: "error", message: typedError.message });
  }
};

export const activeRooms = async (_req: Request, res: Response) => {
  try {
    const activeRooms = await Room.find({ isActive: true })
      .populate("host", "userName")
      .exec();

    res.json({ status: "ok", rooms: activeRooms });
  } catch (error) {
    const typedError = error as Error;
    console.error(typedError);
    res.status(500).send({ status: "error", message: typedError.message });
  }
};

export const deleteRoom = async (userId: string) => {
  try {
    await Room.deleteOne({ host: userId });
    console.log(`Room created by user ${userId} has been deleted`);
  } catch (error) {
    console.error("Error deleting room:", error);
  }
};
