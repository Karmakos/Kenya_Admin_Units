import * as helper from "../../utils/helpers.js";


export function validateCountryCallCode(countryCallCodeInput) {
    const countryCallCode = parseInt(helper.sanitizeNumberInput(countryCallCodeInput))
    if (!countryCallCode || isNaN(countryCallCode) || countryCallCode > 999) {
        const message = "The country call code you provided is invalid. Please enter a valid numeric code."

        throw new helper.APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }
    return countryCallCode
}

export function validateCountryName(countryNameInput) {
    const countryName = helper.sanitizeStringInput(countryNameInput)
    if (!countryName || typeof countryName !== "string") {
        const message = "The country name you provided is invalid. Please enter a valid alphabetical name."

        throw new helper.APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }
    return countryName
}

export function validateCountryAbbreviation(countryAbbrInput) {
    const abbreviation = helper.sanitizeStringInput(countryAbbrInput).toUpperCase()
    if (!abbreviation || !(abbreviation.length > 1) || !(4 > abbreviation.length)) {
        const message = `The country abbreviation you provided is invalid. Please enter a valid country abbreviation that follow the ISO 3166-1 standard, which uses two-letter (Alpha-2) and three-letter (Alpha-3) codes.`

        throw new helper.APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }
    return abbreviation
}
