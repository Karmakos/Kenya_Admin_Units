// Handles querying PostgreSQL.
import { reader } from "../../database/pool.js";

export async function findAllDivisions(offset, limit) {

    const result = await reader.query(`
        SELECT country_name,county_name, sub_county_name, division_name 
        FROM division as m

        INNER JOIN sub_county as i
        on m.sub_county_id=i.id

        INNER JOIN county as j
        ON i.county_id=j.id

        INNER JOIN country as k
        ON j.country_id=k.id

        ORDER BY sub_county_code 
        LIMIT $1 OFFSET $2`,
        [limit, offset]
    );

    return result.rows ?? null;
}

export async function findAllSubCountyDivisions(sub_county_name, offset, limit) {

    const result = await reader.query(`
        SELECT county_name, sub_county_code, sub_county_name, division_name
        FROM division as m

        INNER JOIN sub_county as i
        ON m.sub_county_id=i.id

        INNER JOIN county as j
        ON i.county_id=j.id

        INNER JOIN country as k
        ON j.country_id=k.id
        
        WHERE i.sub_county_name ILIKE $1
        ORDER BY sub_county_code 
        LIMIT $2 OFFSET $3`,
        [`%${sub_county_name}%`, limit, offset]
    );

    return result.rows ?? null;
}


export async function countAllCountryDivisions() {
    const result = await reader.query(`
        SELECT COUNT (*) FROM division `);

    return result.rows[0].count ?? 0;
}

export async function countAllSubCountyDivisions(sub_county_name) {
    const result = await reader.query(`
        SELECT COUNT (*) FROM sub_county
        INNER JOIN division as i
        ON i.sub_county_id=sub_county.id
        WHERE sub_county_name ILIKE $1`,
        [`%${sub_county_name}%`]

    );

    return result.rows[0].count ?? 0;
}


export async function findByName(divisionName) {

    const result = await reader.query(`
        SELECT country_name, county_name, sub_county_name, division_name
        FROM division as m

        LEFT JOIN sub_county as i
        ON m.sub_county_id = i.id

        LEFT JOIN county as j
        ON i.county_id = j.id

        LEFT JOIN country as k
        ON j.country_id = k.id
        WHERE  m.division_name ILIKE $1 
        `,
        [`%${divisionName}%`]
    );

    return result.rows ?? null;

}
