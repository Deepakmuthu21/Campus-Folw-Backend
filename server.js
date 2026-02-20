import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/dbConfig.js";
import departmentRoutes from "./Routes/departmentRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import taskRoutes from "./Routes/asssignmentRouts.js";
import submissionRoutes from "./Routes/submissionRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// middleware for parse json and cors
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5000", // for local testing
    "https://react-campusflow.netlify.app" // deployed frontend
  ],
  credentials: true
}
));

connectDB();

app.use("/api/department", departmentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/submit", submissionRoutes);

app.get("/", (req, res) => {
  res.send("College Portal API Running");
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
