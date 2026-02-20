import express from "express";
import userAuthMiddleware from "../Middleware/authUser.js";
import  role from "../Middleware/roleMiddleware.js";
import { createAssignment, deleteAssignment, getMentorAssignments, getStudentAssignments } from "../Controllers/assignmentController.js";


const routes = express.Router();

routes.post(
  "/create-assignment",
  userAuthMiddleware,
 role(["mentor"]),
  createAssignment
);

routes.get(
  "/get-assignment-student",
  userAuthMiddleware,
 role(["student"]),
  getStudentAssignments
);

routes.get(
  "/get-assignment-mentor",
  userAuthMiddleware,
 role(["mentor"]),
  getMentorAssignments
);

routes.delete(
  "/delete-assignment-mentor/:id",
  userAuthMiddleware,
 role(["mentor"]),
  deleteAssignment
);







export default routes
