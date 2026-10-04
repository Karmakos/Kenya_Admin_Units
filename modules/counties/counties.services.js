// Handles the countries processing logic.
import * as countyRepository from "./counties.repositories.js";
import * as validator from "./helpers.js";
import * as raiseError from "../../utils/errorHandlers.js";


export async function getAllCounties(payload) {

    const { country, page, limit } = payload

    const offset = (page - 1) * limit;

    const counties = await countyRepository.findAll(country, offset, limit)
    const totalCounties = await countyRepository.countAll()

    if (!counties?.length) {
        console.warn("No counties found")
        raiseError.resourceNotFoundError("County")
    }

    const totalPages = Math.ceil(totalCounties / limit);

    return ({
        success: true,
        status: 200,
        data: counties,
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalCounties,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    });
}

export async function getCountyByCode(countryName, countyCode) {

    const county = await countyRepository.findByCountyCode(countryName, countyCode)

    console.log("county", county)

    if (!county?.length) {
        console.warn("No counties found")
        raiseError.resourceNotFoundError("County")
    }

    return ({
        success: true,
        status: 200,
        data: county,
    })
}


export async function getCountyByName(countryName, countyName) {

    const county = await countyRepository.findByName(countryName, countyName)

    if (!county?.length) {
        console.warn("No counties found")
        raiseError.resourceNotFoundError("County")
    }

    return ({
        success: true,
        status: 200,
        data: county,
    })
}
