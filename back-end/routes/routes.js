const { Router } = require("express");

const { registerStudent } = require("../controllers/studentController");
const { getBookedSlots, bookSlot } = require("../controllers/slotController");

const { logInDean } = require("../controllers/deanController");

const router = Router();

router.post("/register-login", registerStudent);

router.put("/book-slot/:slotId", bookSlot);
router.get("/slots-booked", getBookedSlots);
router.post("/dean", logInDean);

module.exports = router;
