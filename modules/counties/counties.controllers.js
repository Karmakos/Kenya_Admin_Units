// Controls the HTTP responses
import { writeError, APIError } from "../../utils/helpers.js";
import * as countyService from "./counties.services.js";
import * as helper from "../../utils/helpers.js";

//get all counties

export async function getAllCounties(req, res, next) {

    let limit = Math.max(parseInt(req.query?.limit, 10) || 25);
    let page = Math.max(parseInt(req.query?.page, 10) || 1);
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
        const message = "The country name you provided is invalid. Please enter a valid country name."

        throw new APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }



    const payload = {
        limit: limit,
        page: page,
        country: countryName
    }

    //pass to the controllers
    const response = await countyService.getAllCounties(payload)

    res
        .status(response.status)
        .json(response)

}


//get county code
export async function getCountyByCountyCode(req, res, next) {

    //get county code and sanitize it
    const countyCodeInput = req.query["countyCode"];
    if (!countyCodeInput) {
        const message = "You're missing the county code. Please enter a valid numeric code."

        throw new APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }

    const countyCode = parseInt(helper.sanitizeNumberInput(countyCodeInput))
    if (!countyCode || isNaN(countyCode) || countyCode > 47) {
        const message = "The county code you provided is invalid. Please enter a valid numeric code."

        throw new APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }

    //get country name and sanitize it
    const countryNameInput = req.query["countryName"];
    if (!countryNameInput) {
        const message = "You're missing the country name. Please enter a valid country name."

        throw new APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }
    const countryName = helper.sanitizeStringInput(countryNameInput)
    if (!countryName || typeof countryName !== "string") {
        const message = "The country name you provided is invalid. Please enter a valid country name."

        throw new APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }

    // send service to backend
    const response = await countyService.getCountyByCode(countryName, countyCode)

    res
        .status(response.status)
        .send(response)

}


//get county by name
export async function getCountyByName(req, res, next) {

    //get country name and sanitize it
    const countryNameInput = req.query["countryName"];
    if (!countryNameInput) {
        const message = "You're missing the country name. Please enter a valid country name."

        throw new APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }
    const countryName = helper.sanitizeStringInput(countryNameInput)
    if (!countryName || typeof countryName !== "string") {
        const message = "The country name you provided is invalid. Please enter a valid country name."

        throw new APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }

    // get county name and sanitize it
    const countyNameInput = req.query["countyName"];
    if (!countyNameInput) {
        const message = "You're missing the county name. Please enter a valid county name."

        throw new APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }
    const countyName = helper.sanitizeStringInput(countyNameInput)
    if (!countyName || typeof countyName !== "string") {
        const message = "The county name you provided is invalid. Please enter a valid alphabetical name."

        throw new APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }

    // send service to backend
    const response = await countyService.getCountyByName(countryName, countyName)

    res
        .status(response.status)
        .send(response)

}

