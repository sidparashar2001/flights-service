const express = require('express');
const app = express();

const {ServerConfig, Logger} = require('./config');

const apiRoutes = require("./routes")

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use("/api", apiRoutes)

app.listen(ServerConfig.PORT, async ()=>{
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);    
    Logger.info("Successfully started the server",{} );
    const {cities: City, Airport} = require('./models');
    const gwalior  = await City.findByPk(1);
    console.log(gwalior);
    
    // const airport = Airport.create({name:"Kempegowda Airport", code: 'BLR', cityId: 1});

    // const airport = await gwalior.createAirport({name:"Scindia Airport", code: "gwalior"});
    // console.log(airport);

    // const airportsInGwl = await gwalior.getAirports();
    // console.log(airportsInGwl);
    

    

})