import Router from "express";
import * as searchController from "../modules/search/search.controllers.js";

const router = Router();

router.get("/", searchController.getMatchingNames);

export { router };
