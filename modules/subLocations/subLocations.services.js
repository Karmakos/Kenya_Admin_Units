// Handles the locations processing logic.
import * as subLocationRepository from "./subLocations.repositories.js";
import * as raiseError from "../../utils/errorHandlers.js";


export async function getAllCountrySubLocations(payload) {

    const { country, page, limit } = payload

    const offset = (page - 1) * limit;

    const subLocations = await subLocationRepository.findAllSubLocations(country, offset, limit)
    const totalSubLocations = await subLocationRepository.countAllCountrySubLocations()

    if (!subLocations?.length) {
        console.warn("No sub-locations found")
        raiseError.resourceNotFoundError("Sub_Location")
    }

    const totalPages = Math.ceil(totalSubLocations / limit);

    return ({
        success: true,
        status: 200,
        data: subLocations,
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalSubLocations,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    });
}


export async function getAllSubCountySubLocations(payload) {

    const { sub_county_name, country, page, limit } = payload

    const offset = (page - 1) * limit;

    const subLocations = await subLocationRepository.findAllSubCountySubLocations(sub_county_name, country, offset, limit)
    const totalSubLocations = await subLocationRepository.countAllSubCountySubLocations(sub_county_name)

    if (!subLocations?.length) {
        console.warn("No sub-locations found")
        raiseError.resourceNotFoundError("Sub_Location")
    }

    const totalPages = Math.ceil(totalSubLocations / limit);

    return ({
        success: true,
        status: 200,
        data: subLocations,
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalSubLocations,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    });
}

export async function getSubLocationByName(countryName, subLocationName) {

    const subLocation = await subLocationRepository.findByName(countryName, subLocationName)

    if (!subLocation?.length) {
        console.warn("No sub-locations found")
        raiseError.resourceNotFoundError("Sub_Location")
    }

    return ({
        success: true,
        status: 200,
        data: subLocation,
    })
}
