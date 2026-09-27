--Create Database 
CREATE DATABASE kenya_admin_units

--Country table
CREATE TABLE country IF NOT EXISTS (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    country_name VARCHAR (50) NOT NULL,
    country_code VARCHAR (20) NOT NULL UNIQUE
)

--County table
CREATE TABLE county IF NOT EXISTS  (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    country_id INT NOT NULL,
    county_name VARCHAR (50) NOT NULL,
    county_code VARCHAR (20) NOT NULL UNIQUE,

    CONSTRAINT fk_country 
        FOREIGN KEY (country_id) 
        REFERENCES country(id)


)

--sub county table
CREATE TABLE sub_county IF NOT EXISTS (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    county_id INT NOT NULL,
    sub_county_name VARCHAR(50) NOT NULL,
    sub_county_code VARCHAR(20) NOT NULL UNIQUE,

    CONSTRAINT fk_county 
        FOREIGN KEY (county_id) 
        REFERENCES county(id)

)

CREATE TABLE division IF NOT EXISTS (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sub_county_id INT NOT NULL,
    division_name VARCHAR(50) NOT NULL,

    CONSTRAINT fk_sub_county 
        FOREIGN KEY (sub_county_id) 
        REFERENCES sub_county(id)

    CONSTRAINT uq_division_id_sub_county_name
        UNIQUE (sub_county_id, division_name);

);

--Location table
CREATE TABLE location IF NOT EXISTS (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    division_id INT NOT NULL,
    location_name VARCHAR(50),

    CONSTRAINT fk_division 
        FOREIGN KEY (division_id) 
        REFERENCES division(id)
    
    CONSTRAINT uq_division_id_location_name
        UNIQUE (division_id, location_name);
)

-- sublocation table
CREATE TABLE sub_location IF NOT EXISTS (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    location_id INT NOT NULL,
    sub_location_type_id INT NOT NULL,
    sub_location_name VARCHAR(50),

    CONSTRAINT fk_location 
        FOREIGN KEY (location_id) 
        REFERENCES location(id),

    CONSTRAINT fk_sub_location_type 
        FOREIGN KEY (sub_location_type_id) 
        REFERENCES sub_location_type(id),

    CONSTRAINT uq_location_id_sub_location_name
        UNIQUE (location_id, sub_location_name)

)

-- sub location types
CREATE TABLE special_sub_location IF NOT EXISTS (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    reason CHAR(50),
    county_id INT

)

-- urban centres

CREATE TABLE urban_centre IF NOT EXISTS (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    county_id INT NOT NULL,
    urban_centre_name VARCHAR(50),


    CONSTRAINT fk_county 
        FOREIGN KEY (county_id) 
        REFERENCES county(id)
    
    CONSTRAINT uq_county_id_urban_centre_name
        UNIQUE (county_id, urban_centre_name);

)
