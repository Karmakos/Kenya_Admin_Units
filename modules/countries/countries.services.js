// Handles the countries processing logic.
import * as countryRepository from "./countries.repositories.js";
import * as raiseError from "../../utils/errorHandlers.js";

export async function getAllCountries(page = 1, limit = 25) {

    const offset = (page - 1) * limit;

    const countries = await countryRepository.findAll(offset, limit)
    const totalCountries = await countryRepository.countAll()

    if (!countries?.length) {
        console.warn("No countries found")

        raiseError.resourceNotFoundError("Country")

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

    if (!country?.length) {
        console.warn("No countries found")

        raiseError.resourceNotFoundError("Country")
    }

    return ({
        success: true,
        status: 200,
        data: country,
    })
}


export async function getCountryByName(name) {

    const country = await countryRepository.findByName(name)

    if (!country?.length) {
        console.warn("No countries found")

        raiseError.resourceNotFoundError("Country")
    }

    return ({
        success: true,
        status: 200,
        data: country,
    })
}


export async function getCountryByAbbrv(abbrv) {

    const country = await countryRepository.findByAbbr(abbrv)

    if (!country?.length) {
        console.warn("No countries found")
        raiseError.resourceNotFoundError("Country")

    }

    return ({
        success: true,
        status: 200,
        data: country,
    })
}

