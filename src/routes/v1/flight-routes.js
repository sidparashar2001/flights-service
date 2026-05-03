const express = require("express");
const router = express.Router();
const {FlightController} = require('../../controllers');
const {Flightmiddlewares} = require('../../middlewares');

// /api/v1/flights POST
router.post("/", 
    Flightmiddlewares.validateCreateRequest, 
    FlightController.createFlight);

// /api/v1/flights?trips=MUM-DEL GET
router.get("/",
    FlightController.getAllFlights);

// /api/v1/flights/:id GET

router.get("/:id",
    FlightController.getFlight);

// router.delete("/:id",
//     FlightController.destroyFlight);

// router.patch("/:id",
//     FlightController.updateFlight);

module.exports = router;