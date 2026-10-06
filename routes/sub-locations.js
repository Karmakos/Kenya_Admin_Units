import { Router } from "express";

import * as subLocationsController from "../modules/subLocations/subLocations.controllers.js";

const router = Router();



router.get("/all", subLocationsController.getAllCountrySubLocations);

router.get("/sub-county-sub-locations", subLocationsController.getAllSubCountySubLocations);

router.get("/sub-location-name", subLocationsController.getSubLocationByName);



export { router }