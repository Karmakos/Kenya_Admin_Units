// Controls the HTTP responses
import * as divisionService from "./divisions.services.js";
import * as countryValidator from "../countries/helpers.js";
import * as subCountyValidator from "../subCounties/helpers.js";
import * as divisionValidator from "./helpers.js";
import * as raiseError from "../../utils/errorHandlers.js";

//get all divisions in the country

export async function getAllCountryDivisions(req, res, next) {

    //get limit and page from query parameters
    let limit = Math.max(parseInt(req.query?.limit, 10) || 100);
    let page = Math.max(parseInt(req.query?.page, 10) || 1);

    const payload = {
        limit: limit,
        page: page,
    }

    //pass to the controllers
    const response = await divisionService.getAllCountryDivisions(payload)

    res
        .status(response.status)
        .json(response)

}

//get all divisions in the sub-county

export async function getAllSubCountyDivisions(req, res, next) {

    //get limit and page from query parameters
    let limit = Math.max(parseInt(req.query?.limit, 10) || 25);
    let page = Math.max(parseInt(req.query?.page, 10) || 1);

    // check if any paremeters are missing
    const requiredParams = ["subCountyName"];
    raiseError.missingQueryParameters(req, requiredParams);

    //get sub-county name and sanitize it
    const subCountyNameInput = req.query["subCountyName"];
    const subCountyName = subCountyValidator.validateSubCountyName(subCountyNameInput)


    const payload = {
        limit: limit,
        page: page,
        sub_county_name: subCountyName
    }

    //pass to the controllers
    const response = await divisionService.getAllSubCountyDivisions(payload)

    res
        .status(response.status)
        .json(response)

}

//get division by name
export async function getDivisionByName(req, res, next) {

    const requiredParams = ["divisionName"];
    raiseError.missingQueryParameters(req, requiredParams);

    // get division name and sanitize it
    const divisionNameInput = req.query["divisionName"];
    const divisionName = divisionValidator.validateDivisionName(divisionNameInput)

    // send service to backend
    const response = await divisionService.getDivisionByName(divisionName)

    res
        .status(response.status)
        .send(response)

}

