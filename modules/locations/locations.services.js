// Handles the locations processing logic.
import * as locationRepository from "./locations.repositories.js";
import * as raiseError from "../../utils/errorHandlers.js";


export async function getAllCountryLocations(payload) {

    const { page, limit } = payload

    const offset = (page - 1) * limit;

    const locations = await locationRepository.findAllLocations(offset, limit)
    const totalLocations = await locationRepository.countAllCountryLocations()

    if (!locations?.length) {
        console.warn("No locations found")
        raiseError.resourceNotFoundError("Location")
    }

    const totalPages = Math.ceil(totalLocations / limit);

    return ({
        success: true,
        status: 200,
        data: locations,
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalLocations,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    });
}


export async function getAllSubCountyLocations(payload) {

    const { sub_county_name, page, limit } = payload

    const offset = (page - 1) * limit;

    const locations = await locationRepository.findAllSubCountyLocations(sub_county_name, offset, limit)
    const totalLocations = await locationRepository.countAllSubCountyLocations(sub_county_name)

    if (!locations?.length) {
        console.warn("No locations found")
        raiseError.resourceNotFoundError("Location")
    }

    const totalPages = Math.ceil(totalLocations / limit);

    return ({
        success: true,
        status: 200,
        data: locations,
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalLocations,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    });
}

export async function getLocationByName(locationName) {

    const location = await locationRepository.findByName(locationName)

    if (!location?.length) {
        console.warn("No locations found")
        raiseError.resourceNotFoundError("Location")
    }

    return ({
        success: true,
        status: 200,
        data: location,
    })
}
