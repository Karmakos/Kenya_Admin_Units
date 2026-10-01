import * as helper from "../../utils/helpers.js";

export function validateQueryParameters(req, requiredParams) {
    const missingParams = requiredParams.filter(param => !req.query[param]);
    if (missingParams.length > 0) {
        throw new helper.APIError(`Missing required parameters: ${missingParams.join(", ")}`, {
            success: false,
            status: 400,
            code: "MISSING_REQUIRED_PARAMETERS",
        });
    }
}

export function validateCountyCode(countyCodeInput) {
    const countyCode = parseInt(helper.sanitizeNumberInput(countyCodeInput))
    if (!countyCode || isNaN(countyCode) || countyCode > 47) {
        const message = "The county code you provided is invalid. Please enter a valid numeric code."

        throw new helper.APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }
    return countyCode
}

export function validateCountyName(countyNameInput) {
    const countyName = helper.sanitizeStringInput(countyNameInput)
    if (!countyName || typeof countyName !== "string") {
        const message = "The county name you provided is invalid. Please enter a valid alphabetical name."

        throw new APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }
    return countyName
}