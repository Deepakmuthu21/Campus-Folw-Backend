import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    task: {
      type: String,
      required: true,
    },

    dueDate: String,

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Assignmet = mongoose.model("assignments", assignmentSchema);

export default Assignmet;
