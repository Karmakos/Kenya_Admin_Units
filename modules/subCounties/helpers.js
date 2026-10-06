import * as helper from "../../utils/helpers.js";


export function validateSubCountyCode(subCountyCodeInput) {
    const subCountyCode = parseInt(helper.sanitizeNumberInput(subCountyCodeInput))
    if (!subCountyCode || isNaN(subCountyCode) || subCountyCode > 4750 || subCountyCode < 100) {
        const message = "The sub-county code you provided is invalid. Please enter a valid numeric code."

        throw new helper.APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }
    return subCountyCode
}

export function validateSubCountyName(subCountyNameInput) {
    const subCountyName = helper.sanitizeStringInput(subCountyNameInput)
    if (!subCountyName || typeof subCountyName !== "string") {
        const message = "The sub-county name you provided is invalid. Please enter a valid alphabetical name."

        throw new helper.APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }
    return subCountyName
}
