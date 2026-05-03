const { FlightService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { add } = require("winston");

async function createFlight(req, res) {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        SuccessResponse.data = flight;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Something went wrong while creating a flight";
        ErrorResponse.error = { explanation: error?.message };
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAllFlights(req, res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while fetching flights";
        ErrorResponse.error = { explanation: error?.message };
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getFlight(req, res) {
    try {
        const flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.data = flight;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while fetching the flight";
        ErrorResponse.error = { explanation: error?.message };
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

// // /airports
// async function getAirports (req,res) {
//     try {
//         const airports = await AirportService.getAirports();
//         SuccessResponse.data = airports;
//         return res.status(StatusCodes.OK).json(SuccessResponse)
//     } catch (error) {
//         ErrorResponse.error = error;
//         return res.status(error.statusCode).json(ErrorResponse);
//     }
// }

// // GET: /airports/:id

// async function getAirport (req,res) {
//     try {
//         const airport = await AirportService.getAirport(req.params.id);
//         SuccessResponse.data = airport;
//         return res.status(StatusCodes.OK).json(SuccessResponse)
//     } catch (error) {
//         ErrorResponse.error = error;
//         return res.status(error.statusCode).json(ErrorResponse);
//     }
// }

// // DELETE: /airports/:id

// async function destroyAirport (req,res) {
//     try {
//         const airport = await AirportService.destroyAirport(req.params.id);
//         SuccessResponse.data = airport;
//         return res.status(StatusCodes.OK).json(SuccessResponse)
//     } catch (error) {
//         ErrorResponse.error = error;
//         return res.status(error.statusCode).json(ErrorResponse);
//     }
// }

// // PATCH: /airports/:id

// async function updateAirport (req,res) {
//     try {
//         const airport = await AirportService.updateAirport(req.params.id, req.body);
//         SuccessResponse.data = airport;
//         return res.status(StatusCodes.OK).json(SuccessResponse)
//     } catch (error) {
//         ErrorResponse.error = error;
//         return res.status(error.statusCode).json(ErrorResponse);
//     }
// }

module.exports = {
    createFlight,
    getAllFlights,
    getFlight
    // getFlights,
    // getFlight,
    // destroyFlight,
    // updateFlight
}