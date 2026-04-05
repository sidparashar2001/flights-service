const CrudRepository = require("./crud-repository");
const { airplanes } = require("../models");

class AirplaneRepository extends CrudRepository{
    constructor(){
        super(airplanes);
    }
}

module.exports = AirplaneRepository;