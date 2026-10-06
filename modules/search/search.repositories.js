import { reader } from '../../database/pool.js';


export async function findMatchingNames(searchTerm, offset, limit) {

    const result = await reader.query(`
        SELECT country_name, county_name, sub_county_name, division_name, location_name, sub_location_name
        FROM sub_location as g

        INNER JOIN location as e
        on g.location_id=e.id
        

        INNER JOIN division as f
        on e.division_id=f.id

        LEFT JOIN sub_county as i
        ON f.sub_county_id = i.id

        LEFT JOIN county as j
        ON i.county_id = j.id

        LEFT JOIN country as k
        ON j.country_id = k.id

        WHERE g.sub_location_name ILIKE $1 OR e.location_name ILIKE $1 OR f.division_name ILIKE $1 
        OR i.sub_county_name ILIKE $1 OR j.county_name ILIKE $1
        
        LIMIT $2 OFFSET $3
        `,
        [`%${searchTerm}%`, limit, offset]
    );

    return result.rows ?? null;

}
