import path from "path";
import express from 'express'
import { fileURLToPath } from "url";
import config from "./config/config.js";

import { router as countries } from "./routes/countries.js";
import { router as counties } from "./routes/counties.js";
import { router as subCounties } from "./routes/sub-counties.js";
import { router as divisions } from "./routes/divisions.js";
import { router as locations } from "./routes/locations.js";
import { router as subLocation } from "./routes/sub-locations.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { router as search } from "./routes/search.js";





const app = express();
const port = config.api.port;

//load home path
const filePath = fileURLToPath(import.meta.url)
const __dirname = path.dirname(filePath)


//load the public folder to the middleware
app.use('/static', express.static(path.join(__dirname, 'public')));


//add country routes
app.use('/api/v1/countries', countries);
app.use('/api/v1/counties', counties);
app.use('/api/v1/sub-counties', subCounties)
app.use('/api/v1/divisions', divisions)
app.use('/api/v1/locations', locations)
app.use('/api/v1/sub-locations', subLocation)
app.use('/api/v1/search', search)
//Error handling middleware
app.use(errorHandler);

app.get("/", (req, res) => {

    res.send("Route working perfectly")
})

app.use(notFoundHandler);

app.listen(port, (req, res) => {
    console.log("Listening on port", port)
})