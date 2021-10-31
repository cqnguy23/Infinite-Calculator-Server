import utils from "../helpers/utils.helper.js";
import Calculation from "../models/Calculation.model.js";
import UserSession from "../models/UserSession.model.js";

const calculationsController = {};

calculationsController.getPreviousSessions = async (req, res, next) => {
  try {
    const prevSessions = await UserSession.find({})
      .populate("calculationLogs")
      .sort({ createdAt: -1 });
    return res.status(201).send(prevSessions);
  } catch (err) {
    return next(new utils.AppError(500, err));
  }
};

calculationsController.getSingleSession = async (req, res, next) => {
  try {
    const id = req.params.id;
    const session = await UserSession.findById(id).populate("calculationLogs");
    if (!session) return res.status(404).send("Session not found.");
    return res.status(201).send(session);
  } catch (err) {
    return next(new utils.AppError(500, err));
  }
};

calculationsController.calculate = async (req, res, next) => {
  try {
    const { sessionID, firstOperand, secondOperand, operation } = req.body;
    const sessionName = req.body.sessionName || "My Calculation";
    if (!firstOperand || !secondOperand || !operation) {
      return next(
        new utils.AppError(
          500,
          "Required parameters missing!",
          "Invalid request"
        )
      );
    }
    if (!sessionID) {
      //if is new session
      const session = await UserSession.create({
        name: sessionName,
      });
      let calculation = await Calculation.create({
        owner: session,
        firstOperand,
        secondOperand,
        operation,
      });
      calculation = await calculation.populate({
        path: "owner",
        populate: {
          path: "calculationLogs",
        },
      });
      return res.status(201).send(calculation);
    } else {
      //if is previous session
      const session = await UserSession.findById({
        _id: sessionID,
      });
      if (!session) {
        return next(
          new utils.AppError(404, "Unable to find session", "Invalid Request")
        );
      }
      let calculation = await Calculation.create({
        owner: session,
        firstOperand,
        secondOperand,
        operation,
      });
      calculation = await calculation.populate({
        path: "owner",
        populate: {
          path: "calculationLogs",
        },
      });
      return res.status(201).send(calculation);
    }
  } catch (err) {
    return next(new utils.AppError(500, err, "Invalid Request"));
  }
};
export default calculationsController;
