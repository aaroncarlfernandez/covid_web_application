SELECT country, SUM(confirmed_cases) AS "confirmed", SUM(death_cases) AS "deaths", SUM(recovered_cases) AS "recovered" FROM covid_observations
WHERE observation_date = ${observationDate} 
GROUP BY country
HAVING SUM(confirmed_cases) > 0
ORDER BY confirmed DESC
LIMIT ${maxResults}