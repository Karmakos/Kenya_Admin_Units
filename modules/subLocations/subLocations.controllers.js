// Controls the HTTP responses
import * as subLocationService from "./subLocations.services.js";
import * as countryValidator from "../countries/helpers.js";
import * as subCountyValidator from "../subCounties/helpers.js";
import * as subLocationValidator from "./helpers.js";
import * as raiseError from "../../utils/errorHandlers.js";

//get all sub locations in the country

export async function getAllCountrySubLocations(req, res, next) {

    //get limit and page from query parameters
    let limit = Math.max(parseInt(req.query?.limit, 10) || 100);
    let page = Math.max(parseInt(req.query?.page, 10) || 1);

    const payload = {
        limit: limit,
        page: page,
    }

    //pass to the controllers
    const response = await subLocationService.getAllCountrySubLocations(payload)

    res
        .status(response.status)
        .json(response)

}

//get all sub locations in the sub-county

export async function getAllSubCountySubLocations(req, res, next) {

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
    const response = await subLocationService.getAllSubCountySubLocations(payload)

    res
        .status(response.status)
        .json(response)

}

//get sub location by name
export async function getSubLocationByName(req, res, next) {

    const requiredParams = ["subLocationName"];
    raiseError.missingQueryParameters(req, requiredParams);

    // get sub-location name and sanitize it
    const subLocationNameInput = req.query["subLocationName"];
    const subLocationName = subLocationValidator.validateSubLocationName(subLocationNameInput)

    // send service to backend
    const response = await subLocationService.getSubLocationByName(subLocationName)

    res
        .status(response.status)
        .send(response)

}

