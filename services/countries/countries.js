import { reader } from "../../database/pool.js";

export async function getAllCountries(page = 1, limit = 25) {

    const offset = (page - 1) * limit;

    const client = await reader.connect()

    try {
        client.query('BEGIN')

        const countriesRes = await client.query(`SELECT country_name, country_code FROM country ORDER BY id LIMIT $1 OFFSET $2`,
            [limit, offset]
        )
        const totalCountriesRes = await client.query(`SELECT COUNT (*) FROM country `)

        if (!countriesRes.rows[0] || !totalCountriesRes.rows[0]) {
            console.warn("No countries found")
        }

        const totalCountries = totalCountriesRes.rows[0];
        const totalPages = Math.ceil(totalCountries?.count / limit);


        return ({
            data: countriesRes.rows[0],
            pagination: {
                currentPage: page,
                limit: limit,
                totalItems: totalCountries?.count,
                totalPages: totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        });
    } catch (error) {

        await client.query('ROLLBACK')
        throw error

    } finally {
        client.release()
    }




}