import express from "express";
import { deleteDepartment, editDepartment, getDepartmentById, getDepartments, registerDepartment } from "../Controllers/DepartmentController.js";
import userAuthMiddleware from "../Middleware/authUser.js";
import role from "../Middleware/roleMiddleware.js";

const routes = express.Router();

routes.post("/register", userAuthMiddleware, role(["admin"]), registerDepartment);
routes.get("/get", getDepartments);
routes.get("/get/:id", userAuthMiddleware, role(["admin"]), getDepartmentById);
routes.put("/edit/:id", userAuthMiddleware, role(["admin"]), editDepartment);
routes.delete("/delete/:id", userAuthMiddleware, role(["admin"]), deleteDepartment);



export default routes;



