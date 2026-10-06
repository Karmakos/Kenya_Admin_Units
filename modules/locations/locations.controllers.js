// Controls the HTTP responses
import * as locationService from "./locations.services.js";
import * as countryValidator from "../countries/helpers.js";
import * as subCountyValidator from "../subCounties/helpers.js";
import * as locationValidator from "./helpers.js";
import * as raiseError from "../../utils/errorHandlers.js";

//get all locations in the country

export async function getAllCountryLocations(req, res, next) {

    //get limit and page from query parameters
    let limit = Math.max(parseInt(req.query?.limit, 10) || 100);
    let page = Math.max(parseInt(req.query?.page, 10) || 1);

    const payload = {
        limit: limit,
        page: page,
    }

    //pass to the controllers
    const response = await locationService.getAllCountryLocations(payload)

    res
        .status(response.status)
        .json(response)

}

//get all locations in the sub-county

export async function getAllSubCountyLocations(req, res, next) {

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
    const response = await locationService.getAllSubCountyLocations(payload)

    res
        .status(response.status)
        .json(response)

}

//get location by name
export async function getLocationByName(req, res, next) {

    const requiredParams = ["locationName"];
    raiseError.missingQueryParameters(req, requiredParams);

    // get location name and sanitize it
    const locationNameInput = req.query["locationName"];
    const locationName = locationValidator.validateLocationName(locationNameInput)

    // send service to backend
    const response = await locationService.getLocationByName(locationName)

    res
        .status(response.status)
        .send(response)

}

