import path from "path";
import { processCountryToSubCounty, processSpecialSubLocation, processSubCountytoSubLocation } from "./data/loader.js";
import express from 'express'
import { fileURLToPath } from "url";




const app = express();

const filePath = fileURLToPath(import.meta.url)
const __dirname = path.dirname(filePath)

app.use('/static', express.static(path.join(__dirname, 'public')));


// processCountryToSubCounty()
// processSubCountytoSubLocation()
processSpecialSubLocation()