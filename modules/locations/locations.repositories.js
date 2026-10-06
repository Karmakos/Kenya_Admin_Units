// Handles querying PostgreSQL.
import { reader } from "../../database/pool.js";

export async function findAllLocations(location_name, offset, limit) {

    const result = await reader.query(`
        SELECT country_name,county_name, sub_county_name, division_name, location_name
        FROM location as e

        INNER JOIN division as f
        on e.division_id=f.id
        
        INNER JOIN sub_county as i
        on f.sub_county_id=i.id

        INNER JOIN county as j
        ON i.county_id=j.id

        INNER JOIN country as k
        ON j.country_id=k.id

        WHERE k.country_name ILIKE $1
        ORDER BY county_code 
        LIMIT $2 OFFSET $3`,
        [`%${location_name}%`, limit, offset]
    );

    return result.rows ?? null;
}

export async function findAllSubCountyLocations(sub_county_name, country_name, offset, limit) {

    const result = await reader.query(`
        SELECT county_name, sub_county_code, sub_county_name, division_name, location_name
        FROM location as e

        INNER JOIN division as f
        on e.division_id=f.id

        INNER JOIN sub_county as i
        ON f.sub_county_id=i.id

        INNER JOIN county as j
        ON i.county_id=j.id

        INNER JOIN country as k
        ON j.country_id=k.id
        
        WHERE i.sub_county_name ILIKE $1 AND k.country_name ILIKE $2
        ORDER BY sub_county_code 
        LIMIT $3 OFFSET $4`,
        [`%${sub_county_name}%`, `%${country_name}%`, limit, offset]
    );

    return result.rows ?? null;
}


export async function countAllCountryLocations() {
    const result = await reader.query(`
        SELECT COUNT (*) FROM location `);

    return result.rows[0].count ?? 0;
}

export async function countAllSubCountyLocations(sub_county_name) {
    const result = await reader.query(`
        SELECT COUNT (*) FROM sub_county
        INNER JOIN division as i
        ON i.sub_county_id=sub_county.id
        INNER JOIN location as e
        ON e.division_id=i.id
        WHERE sub_county_name ILIKE $1`,
        [`%${sub_county_name}%`]

    );

    return result.rows[0].count ?? 0;
}


export async function findByName(countryName, locationName) {

    const result = await reader.query(`
        SELECT country_name, county_name, sub_county_name, division_name, location_name
        FROM location as e

        INNER JOIN division as f
        on e.division_id=f.id

        LEFT JOIN sub_county as i
        ON f.sub_county_id = i.id

        LEFT JOIN county as j
        ON i.county_id = j.id

        LEFT JOIN country as k
        ON j.country_id = k.id
        WHERE k.country_name ILIKE $1 AND e.location_name ILIKE $2 
        `,
        [`%${countryName}%`, `%${locationName}%`]
    );

    return result.rows ?? null;

}
