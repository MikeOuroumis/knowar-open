import { Socket } from "socket.io";

export const handleUpdateScoreAndState = (socket: Socket) => {
  socket.on("update_score_and_state", (data) => {
    socket.broadcast.emit("opponent_update_state", data);
  });
};
