import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
   
  },
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;

