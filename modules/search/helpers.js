import * as helper from "../../utils/helpers.js";


export function validateSearchTerm(searchTermInput) {
    const searchTerm = helper.sanitizeStringInput(searchTermInput)
    if (!searchTerm || typeof searchTerm !== "string") {
        const message = "The search term you provided is invalid. Please enter a valid search term."

        throw new helper.APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }
    return searchTerm
}

export function validateSearchScope(searchScopeInput) {
    const searchScope = helper.sanitizeStringInput(searchScopeInput)
    if (!searchScope || typeof searchScope !== "string") {
        const message = "The search scope you provided is invalid. Please enter a valid search scope."

        throw new helper.APIError(message, {
            success: false,
            status: 400,
            code: "INVALID_QUERY_PARAMETER"
        })
    }
    return searchScope || "All"
}