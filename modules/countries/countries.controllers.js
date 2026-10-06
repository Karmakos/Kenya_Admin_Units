// Controls the HTTP responses
import * as countryService from "./countries.services.js";
import * as validator from "./helpers.js";
import * as raiseError from "../../utils/errorHandlers.js";



export async function getAllCountries(req, res, next) {

    let limit = Math.max(parseInt(req.query?.limit, 10) || 25);
    let page = Math.max(parseInt(req.query?.page, 10) || 1);

    //pass to the controllers
    const response = await countryService.getAllCountries(page, limit)

    res
        .status(response.status)
        .json(response)

}

export async function getCountryByCallCode(req, res, next) {

    const requiredParams = ["countryCallCode"];

    // Check for missing query parameters
    raiseError.missingQueryParameters(req, requiredParams)

    //get country call code, sanitize, and validate it
    const callCodeInput = req.query["countryCallCode"];
    const countryCallCode = validator.validateCountryCallCode(callCodeInput)

    //pass to backend service
    const response = await countryService.getCountryByCallCode(countryCallCode)

    res
        .status(response.status)
        .send(response)

}

export async function getCountryByName(req, res, next) {

    const requiredParams = ["countryName"];

    // Check for missing query parameters
    raiseError.missingQueryParameters(req, requiredParams)

    //get country name, sanitize, and validate it
    const countryNameInput = req.query["countryName"];
    const countryName = validator.validateCountryName(countryNameInput)

    // send service to backend
    const response = await countryService.getCountryByName(countryName)

    res
        .status(response.status)
        .send(response)

}


export async function getCountryByAbbr(req, res, next) {

    const requiredParams = ["countryAbbreviation"];

    // Check for missing query parameters
    raiseError.missingQueryParameters(req, requiredParams)

    //get country abbreviation, sanitize, and validate it
    const countryAbbr = req.query["countryAbbreviation"];
    const abbreviation = validator.validateCountryAbbreviation(countryAbbr)

    // send service to backend
    const response = await countryService.getCountryByAbbrv(abbreviation)

    res
        .status(response.status)
        .send(response)

}