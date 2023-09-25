const asyncHandler = require("express-async-handler");
const Dean = require("../model/dean");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const moment = require("moment");

const logInDean = asyncHandler(async (req, res) => {
  const { universityId, name, password } = req.body;

  const existingDean = await Dean.findOne({ name });

  if (existingDean) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingDean.password
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
    const newDean = new Dean({
      name,
      universityId,
      password: hashedPassword,
      token,
    });

    await generateSlots(newDean);

    await newDean.save();

    return res.status(201).json({
      message: "Dean logged in successfully now",
      token: token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function generateSlots(dean) {
  const startDate = moment();
  const endDate = moment().add(3, "months");
  const currentDate = startDate.clone();
  while (currentDate.isBefore(endDate)) {
    if (currentDate.day() === 4 || currentDate.day() === 5) {
      const slot = {
        dayOfWeek: currentDate.format("dddd"),
        date: currentDate.toDate(),
        time: "10:00 AM",
      };

      dean.slots.push(slot);
    }
    currentDate.add(1, "days");
  }
  await dean.save();

  console.log("Slots generated for the next three months.");
}

module.exports = { logInDean };
