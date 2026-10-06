// Handles querying PostgreSQL.
import { reader } from "../../database/pool.js";

export async function findAll(offset, limit) {

    const result = await reader.query(`
        SELECT country_name, county_code, county_name 
        FROM county as m
        INNER JOIN
        country as j
        ON m.country_id=j.id
        ORDER BY county_code 
        LIMIT $1 OFFSET $2`,
        [limit, offset]
    );

    return result.rows ?? null;
}

export async function countAll() {
    const result = await reader.query(`
        SELECT COUNT (*) FROM county `);

    return result.rows[0].count ?? 0;
}

export async function findByCountyCode(countyCode) {
    const result = await reader.query(`
        SELECT county_name, county_code, country_name 
        FROM county as m
        LEFT JOIN
        country as j
        ON m.country_id = j.id 
        WHERE county_code = $1 
        LIMIT 1`,
        [countyCode]
    );

    return result.rows ?? null;

}

export async function findByName(countyName) {

    const result = await reader.query(`
        SELECT county_name, county_code, country_name
        FROM county as m
        LEFT JOIN country as j
        ON m.country_id = j.id
        WHERE m.county_name ILIKE $1 
        `,
        [`%${countyName}%`]
    );

    return result.rows ?? null;

}
