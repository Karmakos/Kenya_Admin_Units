import { getCountryByName } from "../countries/countries.services.js";
import { getCountyByName } from "../counties/counties.services.js";
import { getSubCountyByName } from "../subCounties/subCounties.services.js";
import { getDivisionByName } from "../divisions/divisions.services.js";
import { getLocationByName } from "../locations/locations.services.js";
import { getSubLocationByName } from "../subLocations/subLocations.services.js";
import * as searchRepository from "./search.repositories.js";
import * as raiseError from "../../utils/errorHandlers.js";

export async function getMatchingNames(payload) {
    const { searchTerm, searchScope, page, limit } = payload

    const offset = (page - 1) * limit;



    switch (searchScope) {
        case "Country":
            const country = await getCountryByName(searchTerm)
            return country
        case "County":
            const county = await getCountyByName(searchTerm)
            return county
        case "Sub_County":
            const subCounty = await getSubCountyByName(searchTerm)
            return subCounty
        case "Division":
            const division = await getDivisionByName(searchTerm)
            return division
        case "Location":
            const location = await getLocationByName(searchTerm)
            return location
        case "Sub_Location":
            const subLocation = await getSubLocationByName(searchTerm)
            return subLocation
        case "All":

            const searchResults = await searchRepository.findMatchingNames(searchTerm, offset, limit)
            console.log("searchResults", searchResults)
            if (!searchResults?.length) {
                console.warn("No search results found")
                raiseError.resourceNotFoundError("Search_Result")
            }
            const totalSearchResults = searchResults?.length || 0;
            const totalPages = Math.ceil(totalSearchResults / limit);


            return ({
                success: true,
                status: 200,
                data: searchResults,
                pagination: {
                    currentPage: page,
                    limit: limit,
                    totalItems: totalSearchResults,
                    totalPages: totalPages,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1,
                },
            });

        default:
            console.warn("Invalid search scope")
            raiseError.badRequestError("search_scope")
    }

}
