// Handles querying PostgreSQL.
import { reader } from "../../database/pool.js";

export async function findAllSubCounties(country_name, offset, limit) {

    const result = await reader.query(`
        SELECT country_name,county_name, sub_county_code, sub_county_name 
        FROM sub_county as m

        INNER JOIN county as j
        ON m.county_id=j.id

        INNER JOIN country as k
        ON j.country_id=k.id

        WHERE k.country_name ILIKE $1
        ORDER BY sub_county_code 
        LIMIT $2 OFFSET $3`,
        [`%${country_name}%`, limit, offset]
    );

    return result.rows ?? null;
}

export async function findAllCountySubCounties(county_name, country_name, offset, limit) {

    const result = await reader.query(`
        SELECT county_name, sub_county_code, sub_county_name 
        FROM sub_county as m
        INNER JOIN county as j
        ON m.county_id=j.id
        INNER JOIN country as k
        ON j.country_id=k.id
        WHERE j.county_name ILIKE $1 AND k.country_name ILIKE $2
        ORDER BY sub_county_code 
        LIMIT $3 OFFSET $4`,
        [`%${county_name}%`, `%${country_name}%`, limit, offset]
    );

    return result.rows ?? null;
}


export async function countAll() {
    const result = await reader.query(`
        SELECT COUNT (*) FROM sub_county `);

    return result.rows[0].count ?? 0;
}

export async function findBySubCountyCode(countryName, subCountyCode) {
    const result = await reader.query(`
        SELECT sub_county_name, sub_county_code, county_name, country_name 
        FROM sub_county as m
        LEFT JOIN county as j
        ON m.county_id = j.id 
        LEFT JOIN country as k
        ON j.country_id = k.id 
        WHERE sub_county_code = $1 AND country_name ILIKE $2 
        LIMIT 1`,
        [subCountyCode, `%${countryName}%`]
    );

    return result.rows ?? null;

}

export async function findByName(countryName, subcountyName) {

    const result = await reader.query(`
        SELECT sub_county_name, sub_county_code, county_name, country_name
        FROM sub_county as m
        LEFT JOIN county as j
        ON m.county_id = j.id
        LEFT JOIN country as k
        ON j.country_id = k.id
        WHERE k.country_name ILIKE $1 AND m.sub_county_name ILIKE $2 
        `,
        [`%${countryName}%`, `%${subcountyName}%`]
    );

    return result.rows ?? null;

}
