SELECT DISTINCT TO_CHAR(observation_date, 'YYYY-MM-DD') AS "observation_date_trunc"
FROM covid_observations 
ORDER BY observation_date_trunc