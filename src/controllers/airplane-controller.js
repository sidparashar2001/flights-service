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

// /airplanes
async function getAirplanes (req,res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

// GET: /airplanes/:id

async function getAirplane (req,res) {
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

// DELETE: /airplanes/:id

async function destroyAirplane (req,res) {
    try {
        const airplane = await AirplaneService.destroyAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

// PATCH: /airplanes/:id

async function updateAirplane (req,res) {
    try {
        const airplane = await AirplaneService.updateAirplane(req.params.id, req.body);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createAirPlane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}