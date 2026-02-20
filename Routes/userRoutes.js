import express from "express";
import { adminLogin, deleteUser, getAdmin, getAllMentor, getMentor, getStudent, getStudents, getUserById, login, registerUser, sendMail, updateUser } from "../Controllers/userController.js";
import userAuthMiddleware from "../Middleware/authUser.js";
import  role from "../Middleware/roleMiddleware.js";



const routes = express.Router()

routes.post("/register",registerUser)
routes.post("/login",login)
routes.post("/login-admin",adminLogin)
routes.get("/student-dashboard",userAuthMiddleware,getStudent)
routes.get("/mentor-dashboard",userAuthMiddleware,getMentor)
routes.get("/admin-dashboard",userAuthMiddleware,getAdmin)
routes.get("/get-mentors",userAuthMiddleware,getAllMentor)
routes.get("/getUser/:id",userAuthMiddleware,getUserById)
routes.get("/get-students",userAuthMiddleware,getStudents)
routes.put("/update/:id",userAuthMiddleware,updateUser)
routes.delete("/delete/:id",userAuthMiddleware,deleteUser)
 routes.post("/enquiry",sendMail)




export default routes

