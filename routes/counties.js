import * as countiesController from "../modules/counties/counties.controllers.js";
import { Router } from "express";

const router = Router();

router.get("/", countiesController.getAllCounties)

router.get("/county-code", countiesController.getCountyByCode)

router.get("/county-name", countiesController.getCountyByName)



export { router }