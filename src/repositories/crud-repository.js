const {StatusCodes} = require("http-status-codes"); 
const AppError = require("../utils/errors/app-error");

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(data) {
        const resposne = await this.model.destroy({
            where: {
                id: data
            }
        });
        if(!resposne){
            throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND);
        }
        return resposne;
    }

    async get(data) {
        const resposne = await this.model.findByPk(data);
        if(!resposne){
            throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND);
        }
        return resposne;
    }

    async getAll(data) {
        const resposne = await this.model.findAll(data);
        return resposne;
    }

    async update(id, data) {
        const resposne = await this.model.update(data, {
            where: {
                id: id
            }
        });
        if(resposne[0] === 0){
            throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND);
        }
        return resposne;
    }
}

module.exports = CrudRepository;