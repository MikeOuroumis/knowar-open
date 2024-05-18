import { Socket } from "socket.io";
import Room from "../../models/Room";

export const registerRoomHandlers = (socket: Socket) => {
  socket.on("create_room", (roomId) => {
    socket.broadcast.emit("new_room_available", roomId);
    console.log("room created");
  });

  socket.on("join_room", (roomId) => {
    socket.broadcast.emit("room_joined", roomId);
    console.log("room joined");
  });

  socket.on("leave_room", async (roomID) => {
    console.log("someone left the room with ID:", roomID);
    await deleteRoomByHostID(roomID);
    socket.broadcast.emit("room_deleted", roomID);
  });
};

const deleteRoomByHostID = async (hostID: string) => {
  try {
    await Room.findOneAndDelete({ host: hostID });
    console.log("Room deleted successfully");
  } catch (error) {
    const typeError = error as Error;
    console.error("Failed to delete room:", typeError.message);
  }
};
