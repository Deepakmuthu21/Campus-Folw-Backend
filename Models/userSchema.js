import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    registerNo: String,
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      requried: true,
    },
    password: {
      type: String,
    },
    course: String,
    year: Number,
    phone: String,
    role: {
      type: String,
      enum:["student","mentor","admin"],
      default: "student",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "blocked"],
      default: "pending",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.password) return;
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("users",userSchema)

export default User