const express = require("express");
const router = express.Router();
const { CityController } = require('../../controllers');
const { CityMiddlewares } = require("../../middlewares");

// /api/v1/cities POST
router.post("/",
    CityMiddlewares.validateCreateRequest,
    CityController.createCity);

// router.get("/",
//     AirplaneController.getAirplanes);

// router.get("/:id",
//     AirplaneController.getAirplane);

// router.delete("/:id",
//     AirplaneController.destroyAirplane);

// router.patch("/:id",
//     AirplaneController.updateAirplane);

module.exports = router;