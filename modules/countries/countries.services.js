// Handles the countries processing logic.
import * as countryRepository from "./countries.repositories.js";
import { APIError } from "../../utils/helpers.js";

export async function getAllCountries(page = 1, limit = 25) {

    const offset = (page - 1) * limit;

    const countries = await countryRepository.findAll(offset, limit)
    const totalCountries = await countryRepository.countAll()

    if (!countries) {
        console.warn("No countries found")

        throw new APIError("The country was not found.", {
            success: false,
            status: 404,
            code: "COUNTRY_NOT_FOUND",
        })

    }

    const totalPages = Math.ceil(totalCountries / limit);


    return ({
        success: true,
        status: 200,
        data: countries,
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalCountries?.count,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    });
}

export async function getCountryByCallCode(code) {

    const country = await countryRepository.findByCallCode(code)

    if (!country) {
        console.warn("No countries found")

        throw new APIError("The country was not found.", {
            success: false,
            status: 404,
            code: "COUNTRY_NOT_FOUND",
        })

    }

    return ({
        success: true,
        status: 200,
        country,
    })
}


export async function getCountryByName(name) {

    const country = await countryRepository.findByName(name)

    if (!country) {
        console.warn("No countries found")

        throw new APIError("The country was not found.", {
            success: false,
            status: 404,
            code: "COUNTRY_NOT_FOUND",
        })

    }

    return ({
        success: true,
        status: 200,
        country,
    })
}


export async function getCountryByAbbrv(abbrv) {

    const country = await countryRepository.findByAbbr(abbrv)

    if (!country) {
        console.warn("No countries found")

        throw new APIError("The country was not found.", {
            success: false,
            status: 404,
            code: "COUNTRY_NOT_FOUND",
        })

    }

    return ({
        success: true,
        status: 200,
        country,
    })
}

