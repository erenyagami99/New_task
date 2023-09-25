const asyncHandler = require("express-async-handler");
// const Slot = require("../model/slot");
const Student = require("../model/student");
const Dean = require("../model/dean");

// const getSlots = asyncHandler(async (req, res) => {
//   try {
//     const data = await Slot.find({ isBooked: false });
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

const bookSlot = asyncHandler(async (req, res) => {
  try {
    const { slotId } = req.params;
    const { studentId } = req.body;
    const studentDetails = await Student.findById(studentId);
    const authToken = req.headers.authorization;
    const token = authToken.split(" ")[1];
    if (studentDetails.token !== token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const dean = await Dean.findOne({ "slots._id": slotId });

    if (!dean) {
      return res.status(404).json({ message: "Dean not found" });
    }
    const slot = dean.slots.find((s) => s._id.toString() === slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.isBooked) {
      return res.status(400).json({ message: "Slot already booked" });
    }
    slot.isBooked = true;
    slot.bookedBy = {
      _id: studentDetails._id,
      name: studentDetails.name,
      universityId: studentDetails.universityId,
    };

    await dean.save();

    return res.status(200).json({ message: "Slot booked successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

const getBookedSlots = asyncHandler(async (req, res) => {
  try {
    const deanId = req.query.deanId;
    const deanDetails = await Dean.findById(deanId);
    const authToken = req.headers.authorization;
    const token = authToken.split(" ")[1];

    if (deanDetails.token !== token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!deanId) {
      return res.status(400).json({ message: "Dean ID is required" });
    }

    if (deanDetails.isAdmin === true) {
      const currentDate = new Date();
      const bookedSlots = deanDetails.slots.filter(
        (slot) => slot.isBooked && slot.date >= currentDate
      );
      return res.status(200).json(bookedSlots);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { bookSlot, getBookedSlots };
