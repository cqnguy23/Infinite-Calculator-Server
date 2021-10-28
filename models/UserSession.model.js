import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSessionSchema = new mongoose.Schema(
  {
    name: String,
    calculationLogs: [{ type: Schema.ObjectId, ref: "Calculation" }],
  },
  {
    timestamps: true,
  }
);

const UserSession = mongoose.model("userSession", userSessionSchema);
export default UserSession;
