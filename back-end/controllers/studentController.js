const asyncHandler = require("express-async-handler");
const Student = require("../model/student");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const registerStudent = asyncHandler(async (req, res) => {
  const { universityId, name, password } = req.body;

  const existingStudent = await Student.findOne({ name });

  if (existingStudent) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingStudent.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Logged in successfully" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const token = uuid.v4();

  if (!universityId || !name || !password) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }
  try {
    const newStudent = new Student({
      name,
      universityId,
      password: hashedPassword,
      token,
    });

    await newStudent.save();

    return res.status(201).json({
      message: "Student profile created and logged in successfully",
      token: token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { registerStudent };
