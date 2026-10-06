import * as helper from "./helpers.js";

// Function to validate query parameters
export function missingQueryParameters(req, requiredParams) {
    const missingParams = requiredParams.filter(param => !req.query[param]);
    if (missingParams.length > 0) {
        throw new helper.APIError(`Missing required parameters: ${missingParams.join(", ")}`, {
            success: false,
            status: 400,
            code: "MISSING_REQUIRED_PARAMETERS",
        });
    }
}

// Function to handle resource not found errors
export function resourceNotFoundError(resourceName) {
    const message = `The ${resourceName} you requested was not found. Please check the resource name and try again.`;
    throw new helper.APIError(message, {
        success: false,
        status: 404,
        code: `${resourceName.toUpperCase()}_NOT_FOUND`
    });
}

// Function to handle resource not found errors
export function badRequestError(requestedResource) {
    const message = `The ${requestedResource} you requested is invalid. Please check the scope and try again.`;
    throw new helper.APIError(message, {
        success: false,
        status: 400,
        code: `${requestedResource.toUpperCase()}_BAD_REQUEST`
    });
}
