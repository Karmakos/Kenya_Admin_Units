// Handles querying PostgreSQL.
import { reader } from "../../database/pool.js";

export async function findAll(offset, limit) {

    const result = await reader.query(`
        SELECT country_name, country_code, abbreviation FROM country 
        ORDER BY id 
        LIMIT $1 OFFSET $2`,
        [limit, offset]
    );

    return result.rows ?? null;
}

export async function findCountryId(countryName) {

    const result = await reader.query(`
        SELECT id, country_name FROM country 
        WHERE country_name ILIKE $1 
        LIMIT 1`,
        [`%${countryName}%`]
    );

    return result.rows ?? null;
}

export async function countAll() {
    const result = await reader.query(`
        SELECT COUNT (*) FROM country `);

    return result.rows[0].count ?? 0;
}

export async function findByCallCode(code) {
    const result = await reader.query(`
        SELECT country_name, country_code, abbreviation FROM country 
        WHERE country_code = $1 
        LIMIT 1`,
        [code]
    );

    return result.rows ?? null;

}

export async function findByName(name) {

    const result = await reader.query(`
        SELECT country_name, country_code, abbreviation FROM country 
        WHERE country_name ILIKE $1 `,
        [`%${name}%`]
    );

    return result.rows ?? null;

}

export async function findByAbbr(abbr) {
    const result = await reader.query(`
        SELECT country_name, country_code, abbreviation FROM country 
        WHERE abbreviation ILIKE $1 `,
        [`%${abbr}%`]
    );

    return result.rows ?? null;

}