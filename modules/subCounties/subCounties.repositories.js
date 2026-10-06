// Handles querying PostgreSQL.
import { reader } from "../../database/pool.js";

export async function findAllSubCounties(offset, limit) {

    const result = await reader.query(`
        SELECT country_name, county_name, sub_county_code, sub_county_name 
        FROM sub_county as m

        INNER JOIN county as j
        ON m.county_id=j.id

        INNER JOIN country as k
        ON j.country_id=k.id

        ORDER BY sub_county_code 
        LIMIT $1 OFFSET $2`,
        [limit, offset]
    );

    return result.rows ?? null;
}

export async function findAllCountySubCounties(county_name, offset, limit) {

    const result = await reader.query(`
        SELECT county_name, sub_county_code, sub_county_name 
        FROM sub_county as m
        INNER JOIN county as j
        ON m.county_id=j.id
        INNER JOIN country as k
        ON j.country_id=k.id
        WHERE j.county_name ILIKE $1
        ORDER BY sub_county_code 
        LIMIT $2 OFFSET $3`,
        [`%${county_name}%`, limit, offset]
    );

    return result.rows ?? null;
}


export async function countAll() {
    const result = await reader.query(`
        SELECT COUNT (*) FROM sub_county `);

    return result.rows[0].count ?? 0;
}
export async function countCountyAll(county) {
    const result = await reader.query(`
        SELECT COUNT (*) FROM sub_county
        INNER JOIN county as j
        ON sub_county.county_id=j.id
        WHERE j.county_name ILIKE $1`,
        [`%${county}%`]
    );

    return result.rows[0].count ?? 0;
}
export async function findBySubCountyCode(subCountyCode) {
    const result = await reader.query(`
        SELECT sub_county_name, sub_county_code, county_name, country_name 
        FROM sub_county as m
        LEFT JOIN county as j
        ON m.county_id = j.id 
        LEFT JOIN country as k
        ON j.country_id = k.id 
        WHERE sub_county_code = $1 
        LIMIT 1`,
        [subCountyCode]
    );

    return result.rows ?? null;

}

export async function findByName(subcountyName) {

    const result = await reader.query(`
        SELECT sub_county_name, sub_county_code, county_name, country_name
        FROM sub_county as m
        LEFT JOIN county as j
        ON m.county_id = j.id
        LEFT JOIN country as k
        ON j.country_id = k.id
        WHERE m.sub_county_name ILIKE $1 `,
        [`%${subcountyName}%`]
    );

    return result.rows ?? null;

}
