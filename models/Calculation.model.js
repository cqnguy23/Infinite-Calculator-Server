import mongoose from "mongoose";
import utils from "../helpers/utils.helper.js";
import UserSession from "../models/UserSession.model.js";

const Schema = mongoose.Schema;
const calculationSchema = new mongoose.Schema(
  {
    owner: {
      type: Schema.ObjectId,
      ref: "UserSession",
      required: true,
    },
    firstOperand: String,
    secondOperand: String,
    operation: {
      type: String,
      enum: ["+", "-", "*"],
    },
    result: String,
  },
  {
    timestamps: true,
  }
);
calculationSchema.pre("save", function (next) {
  const firstOperand = BigInt(this.firstOperand);
  const secondOperand = BigInt(this.secondOperand);
  const operation = this.operation;
  let result;
  try {
    switch (operation) {
      case "+":
        result = firstOperand + secondOperand;
        break;
      case "-":
        result = firstOperand - secondOperand;
        break;
      case "*":
        result = firstOperand * secondOperand;
        break;
      default:
        result = 0;
    }
    this.result = result.toString();
    next();
  } catch (err) {
    next(new utils.AppError(400, err, "Invalid request"));
  }
});

calculationSchema.post("save", async function (next) {
  try {
    await UserSession.findByIdAndUpdate(this.owner, {
      $push: {
        calculationLogs: this._id,
      },
    });
  } catch (err) {
    next(new utils.AppError(400, err, "Invalid request"));
  }
});
const Calculation = mongoose.model("Calculation", calculationSchema);
export default Calculation;
