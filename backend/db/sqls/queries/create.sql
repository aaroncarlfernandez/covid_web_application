CREATE TABLE covid_observations
(
    sno SERIAL PRIMARY KEY,
    observation_date DATE NOT NULL,
    province_state VARCHAR(90),
    country VARCHAR(80) NOT NULL,
    last_update TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    confirmed_cases INT NOT NULL,
    death_cases INT NOT NULL,
    recovered_cases INT NOT NULL
)
