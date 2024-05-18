import { Socket } from "socket.io";

let questions: unknown;

export const registerQuestionHandlers = (socket: Socket) => {
  socket.on("send_answer", (data) => {
    socket.broadcast.emit("receive_answer", data);
  });

  socket.on("send_questions", (data) => {
    questions = data;
    socket.broadcast.emit("receive_questions", data);
  });

  socket.on("give_me_questions", () => {
    socket.emit("receive_questions", questions);
  });
};
