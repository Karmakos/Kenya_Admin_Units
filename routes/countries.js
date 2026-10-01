import { Router } from "express";
import * as countryController from "../modules/countries/countries.controllers.js";

const router = Router();

router.get("/", countryController.getAllCountries)

router.get("/country-call-code", countryController.getCountryByCallCode)

router.get("/country-name", countryController.getCountryByName)

router.get("/country-abbreviation", countryController.getCountryByAbbr)

export { router }