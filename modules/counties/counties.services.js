// Handles the countries processing logic.
import * as countyRepository from "./counties.repositories.js";
import * as countryRepository from "../countries/countries.repositories.js";
import { APIError } from "../../utils/helpers.js";

export async function getAllCounties(payload) {

    const { country, page, limit } = payload

    const offset = (page - 1) * limit;

    const counties = await countyRepository.findAll(country, offset, limit)
    const totalCounties = await countyRepository.countAll()

    if (!counties?.length) {
        console.warn("No counties found")

        throw new APIError("We couldn't find counties within the country.", {
            success: false,
            status: 404,
            code: "COUNTY_NOT_FOUND",
        })

    }

    const totalPages = Math.ceil(totalCounties / limit);

    return ({
        success: true,
        status: 200,
        data: counties,
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalCounties?.count,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    });
}

export async function getCountyByCode(countryName, countyCode) {

    const county = await countyRepository.findByCountyCode(countryName, countyCode)

    console.log("county", county)

    if (!county) {
        console.warn("No counties found")

        throw new APIError("The county was not found.", {
            success: false,
            status: 404,
            code: "COUNTY_NOT_FOUND",
        })
    }

    return ({
        success: true,
        status: 200,
        data: county,
    })
}


export async function getCountyByName(countryName, countyName) {

    const county = await countyRepository.findByName(countryName, countyName)

    if (!county) {
        console.warn("No counties found")

        throw new APIError("The county was not found.", {
            success: false,
            status: 404,
            code: "COUNTY_NOT_FOUND",
        })

    }

    return ({
        success: true,
        status: 200,
        data: county,
    })
}
