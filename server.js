import path from "path";
import express from 'express'
import { fileURLToPath } from "url";
import config from "./config/config.js";

import { router as countries } from "./controllers/countries.js";
import { router as counties } from "./controllers/counties.js";
import { router as subCounties } from "./controllers/sub-counties.js";
import { router as divisions } from "./controllers/divisions.js";
import { router as locations } from "./controllers/locations.js";
import { router as subLocation } from "./controllers/sub-locations.js";





const app = express();
const port = config.api.port;

//load home path
const filePath = fileURLToPath(import.meta.url)
const __dirname = path.dirname(filePath)


//load the public folder to the middleware
app.use('/static', express.static(path.join(__dirname, 'public')));


//add country routes
app.use('/countries', countries);
app.use('/counties', counties);
app.use('/sub-counties', subCounties)
app.use('/divisions', divisions)
app.use('/locations', locations)
app.use('/sub-location', subLocation)



app.get("/", (req, res) => {

    res.send("Route working perfectly")
})



app.listen(port, (req, res) => {
    console.log("Listening on port", port)
})