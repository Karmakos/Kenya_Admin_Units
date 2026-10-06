import * as locationsController from "../modules/locations/locations.controllers.js";

import { Router } from "express";

const router = Router();

router.get("/all", locationsController.getAllCountryLocations);

router.get("/sub-county-locations", locationsController.getAllSubCountyLocations);


router.get("/location-name", locationsController.getLocationByName);





export { router }