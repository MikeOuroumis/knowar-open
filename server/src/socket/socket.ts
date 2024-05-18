import { Server as HttpServer } from "http";
import { Socket, Server as SocketServer, Namespace } from "socket.io";
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

export const initializeSocket = (server: HttpServer) => {
  const io = new SocketServer(server, {
    cors: {
      origin: "*",
    },
  });

  const socketNamespace: Namespace = io.of("/socket");

  socketNamespace.on("connection", (socket: Socket) => {
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
