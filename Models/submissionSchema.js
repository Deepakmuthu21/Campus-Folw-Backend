import mongoose from "mongoose";


const submissionSchema = new mongoose.Schema({
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment"
  },

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  mentor:{
     type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  submissionLink: {
    type: String,
    required: true
  },
  title:String,

  

  status: {
    type: String,
    enum: ["Not sumbint yet","submitted", "reviewed"],
    default: "Not sumbint yet"
  },

  remarks:{
    type: String,
  },

  grade: Number

}, { timestamps: true });
const Submission = mongoose.model("submissions",submissionSchema)

export default Submission
