// Controls the HTTP responses
import { writeError, APIError } from "../../utils/helpers.js";
import * as countyService from "./counties.services.js";
import * as helper from "../../utils/helpers.js";
import * as validator from "./helpers.js";
import * as raiseError from "../../utils/errorHandlers.js";

//get all counties

export async function getAllCounties(req, res, next) {

    let limit = Math.max(parseInt(req.query?.limit, 10) || 25);
    let page = Math.max(parseInt(req.query?.page, 10) || 1);

    const payload = {
        limit: limit,
        page: page,
    }

    //pass to the controllers
    const response = await countyService.getAllCounties(payload)

    res
        .status(response.status)
        .json(response)

}


//get county code
export async function getCountyByCode(req, res, next) {


    const requiredParams = ["countyCode"];

    raiseError.missingQueryParameters(req, requiredParams);


    //get county code and sanitize it
    const countyCodeInput = req.query["countyCode"];
    const countyCode = validator.validateCountyCode(countyCodeInput);

    // send service to backend
    const response = await countyService.getCountyByCode(countyCode)

    res
        .status(response.status)
        .send(response)

}


//get county by name
export async function getCountyByName(req, res, next) {

    const requiredParams = ["countyName"];

    raiseError.missingQueryParameters(req, requiredParams);

    // get county name and sanitize it
    const countyNameInput = req.query["countyName"];
    const countyName = validator.validateCountyName(countyNameInput)

    // send service to backend
    const response = await countyService.getCountyByName(countyName)

    res
        .status(response.status)
        .send(response)

}

