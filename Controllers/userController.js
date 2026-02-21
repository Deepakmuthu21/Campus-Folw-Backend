import User from "../Models/userSchema.js";
import Department from "../Models/DepartmentSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { registerCourse, sendMailer, approvedUser } from "../Utils/sendMail.js";

const currentYear = new Date().getFullYear(); // 2026
// register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, course, year, phone, role } = req.body;
    const existstingUser = await User.findOne({ email });
    if (existstingUser) {
      return res.status(400).json({ message: "user already exist" });
    }

    if (role === "student") {
      const departmentId = await Department.findOne({ name: course });
      const mentorId = await User.findOne({
        department: departmentId._id,
        role: "mentor",
      });

      const student = await User.create({
        name,
        email,
        password,
        department: departmentId._id,
        mentor: mentorId._id,
        course,
        role,
        year,
        phone,
      });

      await registerCourse(name, email);

      return res
        .status(200)
        .json({ message: "Student register Successfully", result: student });
    } else if (role === "mentor") {
      const department = await Department.findOne({ name: course });
      if (!department) {
        return res.status(400).json({ message: "Department not found" });
      }

      // count = await User.countDocuments({
      //   department: departmentId._id,
      //   role: "mentor",
      // });
      // registerNo = `MENT${course.slice(0, 2)}${currentYear.toString().slice(2)}${(count + 1).toString().padStart(3, "0")}`;
      const mentor = await User.create({
        name,
        email,
        password,
        department: department._id,

        course,
        role,
        year,
        phone,
      });
      
      await registerCourse(name, email);

      return res
        .status(200)
        .json({ message: "mentor register Successfully", result: mentor });
    } else if (role === "admin") {
      const admin = await User.create({
        name,
        email,
        password,
        status: "approved",
        role,
        year,
        phone,
      });

      return res
        .status(200)
        .json({ message: "admin register Successfully", result: admin });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.Register failed",
      error: error.message,
    });
  }
};

// user login
export const login = async (req, res) => {
  try {
    const { registerNo, password } = req.body;

    let user = await User.findOne({ registerNo });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    if (user.status !== "approved") {
      return res
        .status(400)
        .json({ message: "Your Aplication is not Aproved yet" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "invalid password" });
    }

    const token = jwt.sign(
      { user_id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.status(200).json({
      message: "user login Successfully",
      userId: user._id,
      userRole: user.role,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.login failed",
      error: error.message,
    });
  }
};

// admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "invalid password" });
    }

    const token = jwt.sign(
      { user_id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    return res.status(200).json({
      message: "login Successfully",
      userId: user._id,
      userRole: user.role,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.login failed",
      error: error.message,
    });
  }
};

// get student

export const getStudent = async (req, res) => {
  try {
    const studentId = req.user.user_id;

    const student = await User.findById(studentId);

    if (!student) {
      return res.status(500).json({
        message: "student is not found",
      });
    }

    return res
      .status(200)
      .json({ message: "Welcome to Student Dashboard", result: student });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get mentor
export const getMentor = async (req, res) => {
  try {
    const mentorId = req.user.user_id;

    const mentor = await User.findById(mentorId);
    if (!mentor) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }

    return res
      .status(200)
      .json({ message: "Welcome to Mentor Dashboard", result: mentor });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get student by mentor

export const getStudents = async (req, res) => {
  try {
    const mentorId = req.user.user_id;

    const students = await User.find({ mentor: mentorId });
    if (!students) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get admin
export const getAdmin = async (req, res) => {
  try {
    const adminId = req.user.user_id;

    const admin = await User.findById(adminId);
    if (!admin) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }

    return res
      .status(200)
      .json({ message: "Welcome to admin Dashboard", result: admin });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get user by id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const loggedInUser = req.user.user_id;
    const role = req.user.role;

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    // 🔹 Student can view only themselves
    if (role === "student") {
      if (loggedInUser !== id) {
        return res.status(403).json({
          message: "Access denied",
        });
      }

      return res.status(200).json({
        message: "student data fetched Successfully",
        result: user,
      });
    }

    // 🔹 Mentor can view themselves + assigned students
    if (role === "mentor") {
      if (
        loggedInUser === id ||
        (user.role === "student" && user.mentor._id.toString() === loggedInUser)
      ) {
        return res.status(200).json({
          message: "user data fetched Successfully",
          result: user,
        });
      }

      return res.status(403).json({
        message: "Access denied",
      });
    }

    // 🔹 Admin can view anyone
    if (role === "admin") {
      return res.status(200).json({
        message: "user data fetched Successfully",
        result: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//****************************************************************************** */

// update user (role based)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const loggedInUser = req.user.user_id;
    const role = req.user.role;

    const userToUpdate = await User.findById(id);

    if (!userToUpdate) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    // ❌ Student rules
    if (role === "student") {
      if (loggedInUser !== id) {
        return res.status(403).json({
          message: "Access denied",
        });
      }

      delete req.body.role; // prevent role change

      const updatedStudent = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(200).json({
        message: "student updated Successfully",
        result: updatedStudent,
      });
    }

    // ✅ Mentor rules
    if (role === "mentor") {
      // Mentor updating self
      if (loggedInUser === id) {
        delete req.body.role;

        const updatedMentor = await User.findByIdAndUpdate(id, req.body, {
          returnDocument: "after",
        });

        return res.status(200).json({
          message: "mentor updated Successfully",
          result: updatedMentor,
        });
      }

      // Mentor updating student
      if (
        userToUpdate.role === "student" &&
        userToUpdate.mentor &&
        userToUpdate.mentor.toString() === loggedInUser
      ) {
        delete req.body.role;
        if (req.body.status === "approved") {
          let count;
          let registerId;
          count = await User.countDocuments({
            department: userToUpdate.department,
            role: "student",
            status: "approved",
          });
          registerId = `${userToUpdate.course.slice(0, 4)}${currentYear}${(count + 1).toString().padStart(3, "0")}`;

          const updatedStudent = await User.findByIdAndUpdate(
            id,
            { ...req.body, registerNo: registerId },
            { returnDocument: "after" },

            
          );
          if (req.body.status === "approved") {
    await approvedUser(
      updatedStudent.name,
      updatedStudent.email,
      updatedStudent.registerNo
    );
  }
          
          
        }
        const updatedStudent = await User.findByIdAndUpdate(
          id,
          { ...req.body },
          { returnDocument: "after" },
        );

        return res.status(200).json({
          message: "student updated Successfully",
          result: updatedStudent,
        });
      }

      return res.status(403).json({
        message: "Access denied",
      });
    }

    // ✅ Admin rules
    if (role === "admin") {
      // prevent admin modifying other admins
      if (userToUpdate.role === "admin" && loggedInUser !== id) {
        return res.status(403).json({
          message: "Admin cannot update another admin",
        });
      }
      if (req.body.status === "approved") {
        let count;
        let registerId;
        count = await User.countDocuments({
          department: userToUpdate.department,
          role: "mentor",
          status: "approved",
        });
        registerId = `MENT${userToUpdate.course.slice(0, 2)}${currentYear.toString().slice(2)}${(count + 1).toString().padStart(3, "0")}`;
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { ...req.body, registerNo: registerId },
          { returnDocument: "after" },
          
        );
        if (req.body.status === "approved") {
    await approvedUser(
      updatedUser.name,
      updatedUser.email,
      updatedUser.registerNo
    );
  }
      
       return res.status(200).json({
        message: "user status updated Successfully",
        result: updatedUser,
      });
      }
      

      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        returnDocument: "after",
      });

      return res.status(200).json({
        message: "user status updated Successfully",
        result: updatedUser,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.update failed",
      error: error.message,
    });
  }
};

// get all mentor

export const getAllMentor = async (req, res) => {
  try {
    const mentors = await User.find({ role: "mentor" });

    if (!mentors) {
      return res.status(400).json({ Message: "Mentors Not Found" });
    }

    return res.status(200).json(mentors);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.update failed",
      error: error.message,
    });
  }
};

// Delete user

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const loggedInUser = req.user.user_id;
    const role = req.user.role;

    const userToDelete = await User.findById(id);

    if (!userToDelete) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    // ❌ Student cannot delete anyone
    if (role === "student") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    // ✅ Mentor can delete only students
    if (role === "mentor") {
      if (userToDelete.role !== "student") {
        return res.status(403).json({
          message: "Mentor can delete only students",
        });
      }

      await User.findByIdAndDelete(id);

      return res.status(200).json({
        message: "student deleted Successfully",
      });
    }

    // ✅ Admin can delete student and mentor
    if (role === "admin") {
      if (userToDelete.role === "admin") {
        return res.status(403).json({
          message: "Admin cannot delete another admin",
        });
      }

      await User.findByIdAndDelete(id);

      return res.status(200).json({
        message: "user deleted Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.delete failed",
      error: error.message,
    });
  }
};

// mail sender

// mail sender
export const sendMail = async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    await sendMailer(name, email, phone, message);
     res.status(200).json({
      success: true,
      message: "Email sent successfully ✅"
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while sending email",
      error: error.message,
    });
  }
};
