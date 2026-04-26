const express = require("express");
const router = express.Router();
const {AirportController} = require('../../controllers');
const {Airportmiddlewares} = require('../../middlewares');

// /api/v1/airports POST
router.post("/", 
    Airportmiddlewares.validateCreateRequest, 
    AirportController.createAirport);

router.get("/",
    AirportController.getAirports);

router.get("/:id",
    AirportController.getAirport);

router.delete("/:id",
    AirportController.destroyAirport);

router.patch("/:id",
    AirportController.updateAirport);

module.exports = router;