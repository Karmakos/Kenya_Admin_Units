// Handles the countries processing logic.
import * as countyRepository from "./subCounties.repositories.js";
import * as validator from "./helpers.js";
import * as raiseError from "../../utils/errorHandlers.js";


export async function getAllSubCounties(payload) {

    const { country, page, limit } = payload

    const offset = (page - 1) * limit;

    const subCounties = await countyRepository.findAllSubCounties(country, offset, limit)
    const totalSubCounties = await countyRepository.countAll()

    if (!subCounties?.length) {
        console.warn("No sub-counties found")
        raiseError.resourceNotFoundError("Sub-County")
    }

    const totalPages = Math.ceil(totalSubCounties / limit);

    return ({
        success: true,
        status: 200,
        data: subCounties,
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalSubCounties,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    });
}


export async function getAllCountySubCounties(payload) {

    const { country, county, page, limit } = payload

    const offset = (page - 1) * limit;

    const subCounties = await countyRepository.findAllCountySubCounties(county, country, offset, limit)
    const totalSubCounties = await countyRepository.countAll()

    if (!subCounties?.length) {
        console.warn("No sub-counties found")
        raiseError.resourceNotFoundError("Sub-County")
    }

    const totalPages = Math.ceil(totalSubCounties / limit);

    return ({
        success: true,
        status: 200,
        data: subCounties,
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalSubCounties,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    });
}

export async function getSubCountyByCode(countryName, subCountyCode) {

    const subCounty = await countyRepository.findBySubCountyCode(countryName, subCountyCode)

    if (!subCounty?.length) {
        console.warn("No sub-counties found")
        raiseError.resourceNotFoundError("Sub-County")
    }

    return ({
        success: true,
        status: 200,
        data: subCounty,
    })
}


export async function getSubCountyByName(countryName, subCountyName) {

    const subCounty = await countyRepository.findByName(countryName, subCountyName)

    if (!subCounty?.length) {
        console.warn("No sub-counties found")
        raiseError.resourceNotFoundError("Sub-County")
    }

    return ({
        success: true,
        status: 200,
        data: subCounty,
    })
}
