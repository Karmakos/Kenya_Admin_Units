// Handles the countries processing logic.
import * as divisionRepository from "./divisions.repositories.js";
import * as validator from "./helpers.js";
import * as raiseError from "../../utils/errorHandlers.js";


export async function getAllCountryDivisions(payload) {

    const { country, page, limit } = payload

    const offset = (page - 1) * limit;

    const divisions = await divisionRepository.findAllDivisions(country, offset, limit)
    const totalDivisions = await divisionRepository.countAllCountryDivisions()

    if (!divisions?.length) {
        console.warn("No divisions found")
        raiseError.resourceNotFoundError("Division")
    }

    const totalPages = Math.ceil(totalDivisions / limit);

    return ({
        success: true,
        status: 200,
        data: divisions,
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalDivisions,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    });
}


export async function getAllSubCountyDivisions(payload) {

    const { sub_county_name, country, page, limit } = payload

    const offset = (page - 1) * limit;

    const divisions = await divisionRepository.findAllSubCountyDivisions(sub_county_name, country, offset, limit)
    const totalDivisions = await divisionRepository.countAllSubCountyDivisions(sub_county_name)

    if (!divisions?.length) {
        console.warn("No divisions found")
        raiseError.resourceNotFoundError("Division")
    }

    const totalPages = Math.ceil(totalDivisions / limit);

    return ({
        success: true,
        status: 200,
        data: divisions,
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalDivisions,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    });
}

export async function getDivisionByName(countryName, divisionName) {

    const division = await divisionRepository.findByName(countryName, divisionName)

    if (!division?.length) {
        console.warn("No divisions found")
        raiseError.resourceNotFoundError("Division")
    }

    return ({
        success: true,
        status: 200,
        data: division,
    })
}
