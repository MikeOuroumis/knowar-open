import { Socket } from "socket.io";

let questions: unknown;

export const handleSendAnswer = (socket: Socket) => {
  socket.on("send_answer", (data) => {
    socket.broadcast.emit("receive_answer", data);
  });
};

export const handleSendQuestions = (socket: Socket) => {
  socket.on("send_questions", (data) => {
    questions = data;
    socket.broadcast.emit("receive_questions", data);
  });
  socket.emit("receive_questions", questions);
};

export const handleGiveMeQuestions = (socket: Socket) => {
  socket.on("give_me_questions", () => {
    socket.emit("receive_questions", questions);
  });
};
