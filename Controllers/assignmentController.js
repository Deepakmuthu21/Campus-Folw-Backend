import Assignment from "../Models/assignmentSchema.js";
import User from "../Models/userSchema.js";

// 🔹 Mentor creates assignment
export const createAssignment = async (req, res) => {
  try {
    const mentorId = req.user.user_id;
    const getDepartmentId = await User.findById(mentorId);
    if (!getDepartmentId) {
      return res.status(400).json({ message: "cant get department Id" });
    }
    const departmentId = getDepartmentId.department;

    const { title, task, dueDate } = req.body;

    const assignment = await Assignment.create({
      title,
      task,
      dueDate,
      department: departmentId,
      mentor: mentorId,
    });

    return res.status(201).json({
      message: "Assignment created successfully",
      data: assignment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create assignment",
      error: error.message,
    });
  }
};

//  Get all assignments (student view)
export const getStudentAssignments = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const student = await User.findById(userId);
      if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }


    const assignments = await Assignment.find({
      department: student.department,
      mentor: student.mentor,
    });

    if (assignments.length === 0) {
      return res.status(400).json({ message: "assinments not found" });
    }

    return res.status(201).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get all assignments (mentor view)
export const getMentorAssignments = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const assignments = await Assignment.find({
      mentor: userId,
    });
    if (assignments.length === 0) {
      return res.status(400).json({ message: "assinments not found" });
    }

    return res.status(201).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete Assignment

export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAssignment = await Assignment.findByIdAndDelete(id);

    if (!deletedAssignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }
    return res.status(200).json({
      message: "Assignment delete Successfully",
      result: deletedAssignment,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Faild to delete Assignment", error: error.message });
  }
};
