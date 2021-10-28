import utils from "../helpers/utils.helper.js";
import Calculation from "../models/Calculation.model.js";
import UserSession from "../models/UserSession.model.js";

const calculationsController = {};

calculationsController.getPreviousSessions = async (req, res, next) => {
  try {
    const prevSessions = await UserSession.find({}).populate("calculationLogs");
    return res.status(201).send(prevSessions);
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
      const calculation = await Calculation.create({
        owner: session,
        firstOperand,
        secondOperand,
        operation,
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
      const calculation = await Calculation.create({
        owner: session,
        firstOperand,
        secondOperand,
        operation,
      });
      return res.status(201).send(calculation);
    }
  } catch (err) {
    return next(new utils.AppError(500, err, "Invalid Request"));
  }
};
export default calculationsController;
