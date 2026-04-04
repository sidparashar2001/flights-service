const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const {SuccessResponse, ErrorResponse} = require("../utils/common");

async function createAirPlane(req, res) {
    try {
        const airplane = await AirplaneService.createAirPlane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = airplane;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Something went wrong while creating an airplane";
        ErrorResponse.error = {explanation: error?.message};
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createAirPlane
}