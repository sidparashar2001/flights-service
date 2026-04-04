const { Logger } = require("../config");

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            Logger.info("Something went wrong in the CRUD repo : create");
            throw error;
        }
    }

    async destroy(data) {
        try {
            const resposne = await this.model.destroy({
                where: {
                    id: data
                }
            });
            return resposne;
        } catch (error) {
            Logger.info("Something went wrong in the CRUD repo : destroy");
            throw error;
        }
    }

    async get(data) {
        try {
            const resposne = await this.model.findByPK(data);
            return resposne;
        } catch (error) {
            Logger.info("Something went wrong in the CRUD repo : get");
            throw error;
        }
    }

    async getAll(data) {
        try {
            const resposne = await this.model.findAll(data);
            return resposne;
        } catch (error) {
            Logger.info("Something went wrong in the CRUD repo : getAll");
            throw error;
        }
    }

    async update(id, data) {
        try {
            const resposne = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return resposne;
        } catch (error) {
            Logger.info("Something went wrong in the CRUD repo : update");
            throw error;
        }
    }
}

module.exports = CrudRepository;