import * as helper from "../../utils/helpers.js";


export function validateLocationName(locationNameInput) {
    const locationName = helper.sanitizeStringInput(locationNameInput)
    if (!locationName || typeof locationName !== "string") {
        const message = "The location name you provided is invalid. Please enter a valid alphabetical name."

        throw new helper.APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }
    return locationName
}
