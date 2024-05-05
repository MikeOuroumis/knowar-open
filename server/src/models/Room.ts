import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  category: String,
  userName: String,
  host: { type: mongoose.Schema.Types.ObjectId, ref: "RegisteredUsers" },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "RegisteredUsers" }],
  isActive: { type: Boolean, default: true },
});

const Room = mongoose.model("Room", RoomSchema);
export default Room;
