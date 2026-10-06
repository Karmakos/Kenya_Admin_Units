import { getCountryByName } from "../countries/countries.services.js";
import { getCountyByName } from "../counties/counties.services.js";
import { getSubCountyByName } from "../subCounties/subCounties.services.js";
import { getDivisionByName } from "../divisions/divisions.services.js";
import { getLocationByName } from "../locations/locations.services.js";
import { getSubLocationByName } from "../subLocations/subLocations.services.js";
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
        default:
            console.warn("Invalid search scope")
            raiseError.badRequestError("search_scope")
    }

}
