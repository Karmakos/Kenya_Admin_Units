// Controls the HTTP responses
import * as subCountyService from "./subCounties.services.js";
import * as countryValidator from "../countries/helpers.js";
import * as countyValidator from "../counties/helpers.js";
import * as subCountyValidator from "./helpers.js";
import * as raiseError from "../../utils/errorHandlers.js";

//get all sub-counties in the country

export async function getAllSubCounties(req, res, next) {

    //get limit and page from query parameters
    let limit = Math.max(parseInt(req.query?.limit, 10) || 25);
    let page = Math.max(parseInt(req.query?.page, 10) || 1);

    const payload = {
        limit: limit,
        page: page,
    }

    //pass to the controllers
    const response = await subCountyService.getAllSubCounties(payload)

    res
        .status(response.status)
        .json(response)

}

//get all sub-counties in the county

export async function getAllCountySubCounties(req, res, next) {

    //get limit and page from query parameters
    let limit = Math.max(parseInt(req.query?.limit, 10) || 25);
    let page = Math.max(parseInt(req.query?.page, 10) || 1);

    // check if any paremeters are missing
    const requiredParams = ["countyName"];
    raiseError.missingQueryParameters(req, requiredParams);

    //get county name and sanitize it
    const countyNameInput = req.query["countyName"];
    const countyName = countyValidator.validateCountyName(countyNameInput)


    const payload = {
        limit: limit,
        page: page,
        county: countyName
    }

    //pass to the controllers
    const response = await subCountyService.getAllCountySubCounties(payload)

    res
        .status(response.status)
        .json(response)

}


//get sub-county code
export async function getSubCountyByCode(req, res, next) {

    // check if any paremeters are missing
    const requiredParams = ["subCountyCode"];
    raiseError.missingQueryParameters(req, requiredParams);


    //get sub-county code and sanitize it
    const subCountyCodeInput = req.query["subCountyCode"];
    const subCountyCode = subCountyValidator.validateSubCountyCode(subCountyCodeInput);

    // send service to backend
    const response = await subCountyService.getSubCountyByCode(subCountyCode)

    res
        .status(response.status)
        .send(response)

}


//get sub-county by name
export async function getSubCountyByName(req, res, next) {

    const requiredParams = ["subCountyName"];
    raiseError.missingQueryParameters(req, requiredParams);

    // get sub-county name and sanitize it
    const subCountyNameInput = req.query["subCountyName"];
    const subCountyName = subCountyValidator.validateSubCountyName(subCountyNameInput)


    // send service to backend
    const response = await subCountyService.getSubCountyByName(subCountyName)

    res
        .status(response.status)
        .send(response)

}

