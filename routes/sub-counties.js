import { Router } from "express";
import * as subCountryController from "../modules/subCounties/subCounties.controllers.js";

const router = Router();

router.get("/all", subCountryController.getAllSubCounties);

router.get("/by-county", subCountryController.getAllCountySubCounties);

router.get("/sub-county-code", subCountryController.getSubCountyByCode);

router.get("/sub-county-name", subCountryController.getSubCountyByName);


export { router }