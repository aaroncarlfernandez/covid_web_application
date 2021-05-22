const dbConn = require('../db');
const queries = require('../db/sqls');

module.exports.getTopConfirmed = async (params) => {
    const results = await dbConn.db.manyOrNone(queries.getTopCountries, {
        observationDate: params.query.observation_date,
        maxResults: params.query.max_results
    });
    return { observation_date: params.query.observation_date, countries: results };
}

module.exports.getUniqueObservationDates = async () => {
    const results = await dbConn.db.manyOrNone(queries.getUnqObsDates);
    return { unique_observation_dates: results };
}

