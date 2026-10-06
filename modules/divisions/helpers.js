import * as helper from "../../utils/helpers.js";


export function validateDivisionName(divisionNameInput) {
    const divisionName = helper.sanitizeStringInput(divisionNameInput)
    if (!divisionName || typeof divisionName !== "string") {
        const message = "The division name you provided is invalid. Please enter a valid alphabetical name."

        throw new helper.APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }
    return divisionName
}
