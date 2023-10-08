import { Socket } from "socket.io";
import Room from "../../models/Room";

export const handleCreateRoom = (socket: Socket) => {
  socket.on("create_room", (roomId) => {
    socket.broadcast.emit("new_room_available", roomId);
    console.log("room created");
  });
};

export const handleJoinRoom = (socket: Socket) => {
  socket.on("join_room", (roomId) => {
    socket.broadcast.emit("room_joined", roomId);
    console.log("room joined");
  });
};

export const handleLeaveRoom = (socket: Socket) => {
  socket.on("leave_room", (roomID) => {
    console.log("someone left the room with ID:", roomID);
    handleCleanUpQuestions(socket);
    deleteRoomByHostID(roomID);
    deleteRoomEmmiter(socket, roomID);
  });
};

const handleCleanUpQuestions = (socket: Socket) => {
  console.log("cleaning up questions");
  socket.on("clean_up_questions", () => {
    console.log("questions cleaned up successfully");
  });
};

const deleteRoomEmmiter = (socket: Socket, roomID: string) => {
  socket.broadcast.emit("room_deleted", roomID);
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
