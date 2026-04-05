const express = require("express");
const router = express.Router();
const {AirplaneController} = require('../../controllers');
const {AirplaneMiddlewares} = require('../../middlewares');

// /api/v1/airplanes POST
router.post("/", 
    AirplaneMiddlewares.validateCreateRequest, 
    AirplaneController.createAirPlane);

router.get("/",
    AirplaneController.getAirplanes);

router.get("/:id",
    AirplaneController.getAirplane);

router.delete("/:id",
    AirplaneController.destroyAirplane);

router.patch("/:id",
    AirplaneController.updateAirplane);

module.exports = router;