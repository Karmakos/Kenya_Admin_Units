// Handles querying PostgreSQL.
import { reader } from "../../database/pool.js";

export async function findAll(country_name, offset, limit) {

    const result = await reader.query(`
        SELECT country_name, county_code, county_name 
        FROM county as m
        INNER JOIN
        country as j
        ON m.country_id=j.id
        WHERE j.country_name ILIKE $1
        ORDER BY county_code 
        LIMIT $2 OFFSET $3`,
        [`%${country_name}%`, limit, offset]
    );

    return result.rows ?? null;
}

export async function countAll() {
    const result = await reader.query(`
        SELECT COUNT (*) FROM county `);

    return result.rows[0].count ?? 0;
}

export async function findByCountyCode(countryName, countyCode) {
    const result = await reader.query(`
        SELECT county_name, county_code, country_name 
        FROM county as m
        LEFT JOIN
        country as j
        ON m.country_id = j.id 
        WHERE county_code = $1 AND country_name ILIKE $2 
        LIMIT 1`,
        [countyCode, `%${countryName}%`]
    );

    return result.rows ?? null;

}

export async function findByName(countryName, countyName) {

    const result = await reader.query(`
        SELECT county_name, county_code, country_name
        FROM county as m
        LEFT JOIN country as j
        ON m.country_id = j.id
        WHERE j.country_name ILIKE $1 AND m.county_name ILIKE $2 
        LIMIT 1`,
        [`%${countryName}%`, `%${countyName}%`]
    );

    return result.rows ?? null;

}
