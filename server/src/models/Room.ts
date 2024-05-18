import mongoose, { Document, Schema } from "mongoose";

interface IRoom extends Document {
  category: string;
  userName: string;
  host: mongoose.Types.ObjectId;
  players: mongoose.Types.ObjectId[];
  isActive: boolean;
}

const RoomSchema: Schema = new Schema(
  {
    category: { type: String, required: true },
    userName: { type: String, required: true },
    host: {
      type: Schema.Types.ObjectId,
      ref: "RegisteredUsers",
      required: true,
    },
    players: [{ type: Schema.Types.ObjectId, ref: "RegisteredUsers" }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Room = mongoose.model<IRoom>("Room", RoomSchema);
export default Room;
