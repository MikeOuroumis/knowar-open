import mongoose from "mongoose";
require("./userDetails");

const User = mongoose.model("RegisteredUsers");
export default User;
