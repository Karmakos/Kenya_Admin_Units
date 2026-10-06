// Handles the divisions processing logic.
import * as divisionRepository from "./divisions.repositories.js";
import * as raiseError from "../../utils/errorHandlers.js";


export async function getAllCountryDivisions(payload) {

    const { page, limit } = payload

    const offset = (page - 1) * limit;

    const divisions = await divisionRepository.findAllDivisions(offset, limit)
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

    const { sub_county_name, page, limit } = payload

    const offset = (page - 1) * limit;

    const divisions = await divisionRepository.findAllSubCountyDivisions(sub_county_name, offset, limit)
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

export async function getDivisionByName(divisionName) {

    const division = await divisionRepository.findByName(divisionName)

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
