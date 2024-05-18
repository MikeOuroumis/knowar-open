import { Socket } from "socket.io";
import { deleteRoom } from "../../controllers/roomController";

export const registerConnectionHandlers = (socket: Socket) => {
  socket.on("on_connect", (msg) => {
    console.log(msg);
  });

  socket.on("disconnect", async () => {
    console.log("User disconnected:", socket.id);
    const userId = "retrieve-user-id-based-on-socket.id";
    await deleteRoom(userId);
  });
};
