import express from "express";
import userAuthMiddleware from "../Middleware/authUser.js";
import role from "../Middleware/roleMiddleware.js";
import {
  evaluateSubmission,
  getSubmissionMentor,
  getSubmissionStudent,
  submitAssignment,
} from "../Controllers/submissionController.js";

const routes = express.Router();

routes.post(
  "/submit-assignment/:id",
  userAuthMiddleware,
  role(["student"]),
  submitAssignment,
);

routes.get(
  "/get-mentor-submission", 
  userAuthMiddleware, 
  role(["mentor"]), 
  getSubmissionMentor
);

routes.get(
  
  "/get-student-submission",
  userAuthMiddleware,
  role(["student"]),
  getSubmissionStudent,
);

routes.put(
  "/evaluate-assignment/:id",
  userAuthMiddleware,
  role(["mentor"]),
  evaluateSubmission,
);

export default routes;
