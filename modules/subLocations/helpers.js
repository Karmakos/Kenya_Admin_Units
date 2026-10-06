import * as helper from "../../utils/helpers.js";


export function validateSubLocationName(subLocationNameInput) {
    const subLocationName = helper.sanitizeStringInput(subLocationNameInput)
    if (!subLocationName || typeof subLocationName !== "string") {
        const message = "The sub-location name you provided is invalid. Please enter a valid alphabetical name."

        throw new helper.APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }
    return subLocationName
}
