import { Socket } from "socket.io";
import User from "../../models/Users";

export const handleJoinGame = (socket: Socket) => {
  socket.on("join_room", (data) => {
    socket.broadcast.emit("opponent_joined", data);
  });
};

export const handleUserInactive = (socket: Socket) => {
  socket.on("user_inactive", (data) => {
    const { roomId, userId } = data;

    // Here you would typically interface with your database to
    // delete the room or mark it as inactive.
    // For this example, we will broadcast the room removal.
    // In practice, implement the deletion logic and THEN broadcast.

    User.findByIdAndDelete(userId, (err: Error, docs: unknown) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted User : ", docs);
      }
    });

    socket.broadcast.emit("room_removed", { roomId });

    console.log(`Room ${roomId} removed by user ${userId}`);
  });
};
