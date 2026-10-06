import * as raiseError from "../../utils/errorHandlers.js";
import * as searchValidator from "./helpers.js";
import * as searchService from "./search.services.js";


export async function getMatchingNames(req, res, next) {
    //get limit and page from query parameters
    let limit = Math.max(parseInt(req.query?.limit, 10) || 50);
    let page = Math.max(parseInt(req.query?.page, 10) || 1);

    // check if any paremeters are missing
    const requiredParams = ["searchTerm", "searchScope"];
    raiseError.missingQueryParameters(req, requiredParams);

    //get search term and sanitize it
    const searchTermInput = req.query["searchTerm"];
    const searchTerm = searchValidator.validateSearchTerm(searchTermInput)

    //get search term and sanitize it
    const searchScopeInput = req.query["searchScope"];
    const searchScope = searchValidator.validateSearchScope(searchScopeInput);

    const payload = {
        limit: limit,
        page: page,
        searchTerm: searchTerm,
        searchScope: searchScope
    }

    const searchResults = await searchService.getMatchingNames(payload);

    res.status(200).json(searchResults);

}