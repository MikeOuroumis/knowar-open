import { Socket } from "socket.io";
import { deleteRoom } from "../../controllers/roomController";

export const handleOnConnect = (socket: Socket) => {
  socket.on("on_connect", (msg) => {
    console.log(msg);
  });
};
export const handleOnDisconnect = (socket: Socket) => {
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    socket.on("disconnect", async () => {
      console.log("User disconnected:", socket.id);
      const userId = "retrieve-user-id-based-on-socket.id";
      await deleteRoom(userId);
    });
  });
};
