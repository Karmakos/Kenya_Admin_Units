// Controls the HTTP responses
import { writeError, APIError } from "../../utils/helpers.js";
import * as countryService from "./countries.services.js";
import * as helper from "../../utils/helpers.js";



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

    const callCodeInput = req.query["code"];
    //clean the user input
    const countryCallCode = parseInt(helper.sanitizeNumberInput(callCodeInput))

    console.log(countryCallCode)

    if (!countryCallCode) {
        const message = "The country call code you provided is invalid. Please enter a valid numeric code."

        throw new APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }

    const response = await countryService.getCountryByCallCode(countryCallCode)

    console.log(response)

    res
        .status(response.status)
        .send(response)

}

export async function getCountryByName(req, res, next) {

    const nameInput = req.query["countryName"];

    if (!nameInput) {
        const message = "The country name you provided is invalid. Please enter a valid country name."

        throw new APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }


    //clean the name input
    const countryName = helper.sanitizeStringInput(nameInput)

    if (!countryName) {
        const message = "The country name you provided is invalid. Please enter a valid alphabetical name."

        throw new APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }
    // send service to backend

    const response = await countryService.getCountryByName(countryName)

    res
        .status(response.status)
        .send(response)

}


export async function getCountryByAbbr(req, res, next) {

    const countryAbbr = req.query["countryAbbreviation"];
    //Clean the user input
    const abbreviation = helper.sanitizeStringInput(countryAbbr).toUpperCase()

    if (!abbreviation || !(abbreviation.length > 1) || !(4 > abbreviation.length)) {
        const message = `The country abbreviation you provided is invalid. Please enter a valid country abbreviation that follow the ISO 3166-1 standard, which uses two-letter (Alpha-2) and three-letter (Alpha-3) codes.`

        throw new APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }

    const response = await countryService.getCountryByAbbrv(abbreviation)

    res
        .status(response.status)
        .send(response)

}