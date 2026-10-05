import { Router } from "express";
import * as divisionsController from "../modules/divisions/divisions.controllers.js";

const router = Router();

router.get("/division-name", divisionsController.getDivisionByName);

router.get("/all", divisionsController.getAllCountryDivisions);

router.get("/sub-county-divisions", divisionsController.getAllSubCountyDivisions);

export { router }