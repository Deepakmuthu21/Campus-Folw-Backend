import Department from "../Models/DepartmentSchema.js";

// register Department
export const registerDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const department = await Department.create({ name });

    return res
      .status(200)
      .json({ message:"department created Successfully" , result: department });
  } catch (error) {
    res.status(400).json({ message:"Faild to create departments",error: error.message });
  }
};

// Get All Department

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    if (departments.length === 0) {
    return  res
        .status(400)
        .json({ message: "departments not found" });
    }

    return res
      .status(200)
      .json(departments);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Faild to fetch departments", error: error.message });
  }
};


// get department by id

export const getDepartmentById = async (req, res) => {
  try {
    const {id} = req.params;

    const department = await Department.findById(id);
    if (!department) {
      return res
        .status(400)
        .json({ message: "department not found" });
    }
    return res
      .status(200)
      .json({ message: "Department fetch Successfully", result: department });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Faild to fetch department", error: error.message });
  }
};

// edit Department

export const editDepartment = async (req, res) => {
  try {
    const {id} = req.params;
    

    const updatedDepartment = await Department.findByIdAndUpdate(
        id, 
        req.body, 
        {new: true,}
    );
    
    if (!updatedDepartment) {
      return res.status(404).json({
        message: "Department not found",
      });
    }
    return res
      .status(200)
      .json({
        message: "Department updated Successfully",
        result: updatedDepartment,
      });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Faild to update department", error: error.message });
  }
};

// delete department

export const deleteDepartment = async (req, res) => {
  try {
    const {id} = req.params;

    const deletedDepartment = await Department.findByIdAndDelete(id);

       if (!deletedDepartment) {
      return res.status(404).json({
        message: "Department not found",
      });
    }
   return res
      .status(200)
      .json({
        message: "Department delete Successfully",
        result: deletedDepartment,
      });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Faild to delete department", error: error.message });
  }
};
