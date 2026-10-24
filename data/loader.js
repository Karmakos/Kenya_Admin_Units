import { createReadStream, appendFile } from 'node:fs';
import { parse } from 'csv-parse';
import { writer } from '../database/pool.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = fileURLToPath(import.meta.url);
const dirname = path.dirname(filePath);

const countryToSubCounty = path.join(
    dirname,
    'country_to_sub_county.csv'
);

const subCountyToSubLocation = path.join(
    dirname,
    'county_to_sub_location.csv'
)

const specialSubLocationURL = path.join(
    dirname,
    'special_sub_locations.csv'
)

//Write to File
function writeError(error) {
    return appendFile("error.log", error, { flags: "a" }, (err) => {
        if (err)
            console.warn("Error writing the error", err);
    });
}

function readRecords(fileURL) {
    const stream = createReadStream(fileURL);
    return stream.pipe(
        parse(
            {
                delimiter: ',',
                columns: true,
                bom: true,
                trim: true
            }));
}


//Move from country to sub county
export async function processCountryToSubCounty() {

    try {

        const records = readRecords(countryToSubCounty)


        for await (const record of records) {

            const country_code = record.COUNTRY_CODE?.trim();
            const country_name = record.COUNTRY_NAME?.trim();
            const county_code = record.COUNTY_CODE.trim();
            const county_name = record.COUNTY_NAME?.trim();
            const sub_county_code = record.SUB_COUNTY_CODE.trim();
            const sub_county_name = record.SUB_COUNTY_NAME.trim();



            if (!country_code || !country_name || !county_code || !county_name || !sub_county_code || !sub_county_name) {
                const error = `\nNo Essential Fields ${record}`
                writeError(error)
            }

            // Country
            const countryRes = await writer.query(
                `INSERT INTO country (country_name, country_code) VALUES($1, $2)
                ON CONFLICT(country_code) 
                    DO UPDATE SET
                    country_name = EXCLUDED.country_name
                RETURNING id
                `,
                [country_name, country_code]
            );

            if (!countryRes.rows[0]) {
                const error = `\nNo Country ID ${JSON.stringify(record)}`
                writeError(error)
                continue;
            }

            const country_id = countryRes.rows[0]?.id;


            // County
            const countyRes = await writer.query(
                `INSERT INTO county (country_id, county_name, county_code) VALUES($1, $2, $3)
                ON CONFLICT(county_code) 
                    DO UPDATE SET
                    county_name = EXCLUDED.county_name
                RETURNING id`,
                [country_id, county_name, county_code]
            );

            if (!countyRes.rows[0]) {
                const error = `\nNo County ID ${JSON.stringify(record)}`
                writeError(error)
                continue;
            }


            const county_id = countyRes.rows[0].id;

            // County
            const subCountyRes = await writer.query(
                `INSERT INTO sub_county(county_id, sub_county_name, sub_county_code) VALUES($1, $2, $3)
                ON CONFLICT(sub_county_code)
                    DO UPDATE SET
                    sub_county_name = EXCLUDED.sub_county_name
                RETURNING id`,
                [county_id, sub_county_name, sub_county_code]
            );

            if (!subCountyRes.rows[0]) {
                const error = `\nNo Sub County ID ${JSON.stringify(record)}`
                writeError(error)
                continue;
            }
            const sub_county_id = subCountyRes.rows[0]?.id

            console.log(`Processed: ${country_name} → ${county_name} → ${sub_county_name}`);
        }

    } catch (error) {

        writeError(`\n Process Country to Sub County Program error: ${error.message}`);

        console.error(`Failed processing record:`, record, error);

    }
}


//Move from sub county to sub location
export async function processSubCountytoSubLocation() {
    try {
        const records = readRecords(subCountyToSubLocation)

        for await (const record of records) {
            console.log(record)

            const county = record.County.trim();
            const subCounty = record.Sub_County.trim();
            const division = record.Division.trim();
            const location = record.Location.trim();
            const subLocation = record.Sub_Location.trim();


            const countyRes = await writer.query(`SELECT id FROM county WHERE county_name=$1`, [county]);

            if (!countyRes.rows[0]) {
                const error = `Couldn't find county ${record}`;
                writeError(error);
                continue
            }

            const countyId = countyRes.rows[0]?.id

            let subCountyRes
            subCountyRes = await writer.query(
                `SELECT id FROM sub_county WHERE sub_county_name=$1`, [subCounty]

            )

            if (!subCountyRes.rows[0]) {
                subCountyRes = await writer.query(
                    `INSERT INTO sub_county (county_id, sub_county_name, sub_county_code) VALUES ($1, $2, $3)
                    ON CONFLICT(sub_county_name, sub_county_code)
                        DO UPDATE SET
                        sub_county_name = EXCLUDED.sub_county_name
                    RETURNING id`, [countyId, subCounty, subCounty]
                )

                if (!subCountyRes.rows[0]) {
                    const error = `Error Inserting sub county ${record}`
                    writeError(error)
                    continue;
                }
            }

            const subCountyId = subCountyRes.rows[0]?.id

            const divisionRes = await writer.query(
                `INSERT INTO division (sub_county_id, division_name) VALUES ($1, $2) 
                ON CONFLICT(sub_county_id, division_name)
                    DO UPDATE SET
                    division_name = EXCLUDED.division_name
                RETURNING id`, [subCountyId, division]
            )

            if (!divisionRes.rows[0]) {
                const error = `Error inserting division ${record}`;
                writeError(error)
                continue;
            }

            const divisionId = divisionRes.rows[0]?.id

            const locationRes = await writer.query(
                `INSERT INTO location (division_id, location_name) VALUES ($1, $2)
                ON CONFLICT(division_id, location_name)
                    DO UPDATE SET
                    location_name = EXCLUDED.location_name
                RETURNING id`, [divisionId, division]
            )

            if (!locationRes.rows[0]) {
                const error = `Error in location ${record}`;
                writeError(error);
                continue
            }

            const locationId = locationRes.rows[0]?.id

            const subLocationRes = await writer.query(
                `INSERT INTO sub_location (location_id, sub_location_name) VALUES ($1, $2, $3)
                ON CONFLICT(location_id, sub_location_name)
                    DO UPDATE SET
                    sub_location_name = EXCLUDED.sub_location_name
                RETURNING id`, [locationId, subLocation]
            )

            if (!subLocationRes.rows[0]) {
                const error = `Error finding sub location ${record}`
                writeError(error)
                continue;
            }

            const subLocationId = subLocationRes.rows[0]?.id

            console.log(`Processed: ${county} → ${subCounty} → ${division}→ ${location}→ ${subLocation}`);



        }

    } catch (error) {

        writeError(`\nProcess Sub County to Sub Location Program error: ${error.message}`);

        console.error(`Failed processing record:`, error);

    }

}

export async function processSpecialSubLocation() {

    console.log(specialSubLocationURL)

    const records = readRecords(specialSubLocationURL)

    try {

        for await (const record of records) {
            console.log(record)
            const county = record.County?.trim().toUpperCase();
            const subLocation = record.Sub_Location?.trim().toUpperCase();
            const reason = record.Reason?.trim().toUpperCase();

            let error;


            if (!county || !subLocation || !reason) {
                error = `One of the fields is missing ${record}`;
                writeError(error);
                continue;
            }

            const countyRes = await writer.query(`SELECT id FROM county WHERE county_name = $1`, [county]);

            if (!countyRes.rows[0]) {
                error = `No County id Found ${record}`;
                writeError(error);
                continue;
            }

            const county_id = countyRes.rows[0]?.id

            const specialSubLocationRes = await writer.query(
                `INSERT INTO special_sub_location (county_id, name, reason) 
                VALUES($1, $2, $3)
                ON CONFLICT (county_id, name)
                    DO UPDATE SET
                    name = EXCLUDED.name
                RETURNING id
                `,
                [county_id, subLocation, reason]);

            if (!specialSubLocationRes.rows[0]) {
                error = `No id returned ${record}`;
                writeError(error);
                continue;
            }

            const special_sublocation_id = specialSubLocationRes.rows[0].id

        }
    } catch (error) {

        error = `\nProcess Special Sub Location Program Error ${error}`
        writeError(error);
        console.warn(error);

    }



}