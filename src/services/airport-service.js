const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirports(){
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError('Error while getting all airports', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirport(data){
    try {
        const airports = await airportRepository.get(data);
        return airports;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The airport you requested is not present", error.statusCode);
        }
        throw new AppError('Error while getting airport', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function destroyAirport(data){
    try {
        const response = await airportRepository.destroy(data);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The airport you requested is not present", error.statusCode);
        }
        throw new AppError('Error while deleting airport', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateAirport(id, data){
    try {
        const response = await airportRepository.update(id, data);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The airport you requested is not present", error.statusCode);
        }
        throw new AppError('Error while updating airport', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}