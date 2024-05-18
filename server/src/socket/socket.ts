import { Server as HttpServer } from "http";
import { Socket, Server as SocketServer } from "socket.io";
import {
  handleOnConnect,
  handleOnDisconnect,
} from "./socketHandlers/connectionHandlers";
import {
  handleSendAnswer,
  handleSendQuestions,
  handleGiveMeQuestions,
} from "./socketHandlers/questionHandlers";
import {
  handleLeaveRoom,
  handleCreateRoom,
} from "./socketHandlers/roomHandlers";
import {
  handleJoinGame,
  handleUserInactive,
} from "./socketHandlers/userHandlers";
import { handleUpdateScoreAndState } from "./socketHandlers/gameplayHandlers";
import { LOCALHOST_URL } from "../config/config";

const configureSocket = (io: SocketServer) => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected to socket🔌:", socket.id);

    handleOnConnect(socket);
    handleOnDisconnect(socket);
    handleSendAnswer(socket);
    handleSendQuestions(socket);
    handleGiveMeQuestions(socket);
    handleJoinGame(socket);
    handleLeaveRoom(socket);
    handleCreateRoom(socket);
    handleUserInactive(socket);
    handleUpdateScoreAndState(socket);
  });
};

export const initializeSocket = (server: HttpServer) => {
  if (!LOCALHOST_URL) {
    console.error("Error: LOCALHOST_URL is not set!");
    return;
  }

  const io = new SocketServer(server, {
    cors: {
      origin: `${LOCALHOST_URL}:5002`,
      methods: ["GET", "POST"],
    },
  });

  configureSocket(io);
};
