const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    const endingTripTime = "23:59:59";
    let sortFilter = [];
    // trips=MUM-DEL
    if (query.trips) {
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        // TODO: add a check that they are same
    }

    if (query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, (maxPrice === undefined) ? 20000 : maxPrice]
        }
    }

    if (query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }

    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }

    if (query.sort) {
        const params = query.sort.split(",");
        const sortFilters = params.map((param) => param.split("_"));
        sortFilter = sortFilters;
    }


    try {
        const filghts = await flightRepository.getAllFlights(customFilter, sortFilter);
        return filghts;
    } catch (error) {
        throw new AppError('Cannot fetch data of all flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// async function getAirports(){
//     try {
//         const airports = await airportRepository.getAll();
//         return airports;
//     } catch (error) {
//         throw new AppError('Error while getting all airports', StatusCodes.INTERNAL_SERVER_ERROR)
//     }
// }

// async function getAirport(data){
//     try {
//         const airports = await airportRepository.get(data);
//         return airports;
//     } catch (error) {
//         if(error.statusCode == StatusCodes.NOT_FOUND){
//             throw new AppError("The airport you requested is not present", error.statusCode);
//         }
//         throw new AppError('Error while getting airport', StatusCodes.INTERNAL_SERVER_ERROR)
//     }
// }

// async function destroyAirport(data){
//     try {
//         const response = await airportRepository.destroy(data);
//         return response;
//     } catch (error) {
//         if(error.statusCode == StatusCodes.NOT_FOUND){
//             throw new AppError("The airport you requested is not present", error.statusCode);
//         }
//         throw new AppError('Error while deleting airport', StatusCodes.INTERNAL_SERVER_ERROR)
//     }
// }

// async function updateAirport(id, data){
//     try {
//         const response = await airportRepository.update(id, data);
//         return response;
//     } catch (error) {
//         if(error.statusCode == StatusCodes.NOT_FOUND){
//             throw new AppError("The airport you requested is not present", error.statusCode);
//         }
//         throw new AppError('Error while updating airport', StatusCodes.INTERNAL_SERVER_ERROR)
//     }
// }


module.exports = {
    createFlight,
    getAllFlights
    // getAirports,
    // getAirport,
    // destroyAirport,
    // updateAirport
}