import Submission from "../Models/submissionSchema.js";
import Assignment from "../Models/assignmentSchema.js";

//  Student submits assignment
export const submitAssignment = async (req, res) => {
  try {
    const { submissionLink } = req.body;

    const { id } = req.params;

    // Check if assignment exists
    const assignment = await Assignment.findById(id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    const submission = await Submission.create({
      assignment: id,
      student: req.user.user_id,
      mentor: assignment.mentor,
      submissionLink,
      title: assignment.title,

      status: "submitted",
    });

    res.status(201).json({
      message: "Assignment submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Submission failed",
      error: error.message,
    });
  }
};

// get All Submission (mentor viwe)

export const getSubmissionMentor = async (req, res) => {
  try {
    const id = req.user.user_id;

    const submission = await Submission.find({
      mentor: id,
    });

    if (submission.length === 0) {
      return res.status(404).json({ message: "Submissions not found" });
    }
    return res.json(submission);
  } catch (error) {
    return res.status(500).json({
      message: "fetch submission failed failed",
      error: error.message,
    });
  }
};

//  Mentor evaluates submission
export const evaluateSubmission = async (req, res) => {
  try {
    const { remarks, grade } = req.body;
    const { id } = req.params;

    const submission = await Submission.findByIdAndUpdate(
      id,
      {
        remarks,
        grade,
        status: "reviewed",
      },
       { returnDocument: 'after' },
    );

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    return res.json({
      message: "Submission evaluated successfully",
      data: submission,
    });
  } catch (error) {
    res.status(500).json({
      message: "Evaluation failed",
      error: error.message,
    });
  }
};

// get All Submission (Student viwe)

export const getSubmissionStudent = async (req, res) => {
  try {
    const id = req.user.user_id;

    const submission = await Submission.find({
      student: id,
    });

    if (submission.length === 0) {
      return res.status(404).json({ message: "Submissions not found" });
    }
    return res.json(submission);
  } catch (error) {
    return res.status(500).json({
      message: "fetch submission failed failed",
      error: error.message,
    });
  }
};
