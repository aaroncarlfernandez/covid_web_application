const dotenv = require('dotenv');
const fastcsv = require("fast-csv");
const fs = require("fs");
const pgp = require('pg-promise')({ capSQL: true }); // pg-promise core library
const dbConfig = require('../db-config.json');
const db = pgp(dbConfig);
const queries = require('../db/sqls');

dotenv.config({ path: './config/config.env' });

initializeTable = (arg) =>  { 
    if (arg=="-to") {
        console.log(`TRUNCATE-ing the table`);
        db.none(queries.truncate)
        .then(() => { parseAndInsert(); })
        .catch((error) => console.log(error));
    } else {
        console.log(`DROP-ping and CREATE-ing the table`);
        db.none(queries.drop)
        .then(() => {
            db.none(queries.create)
            .then(() => { parseAndInsert(); })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
}
parseAndInsert = () =>  {
    let stream = fs.createReadStream(process.env.CSV_FILE);
    let csvData = [];
    let csvStream =  fastcsv
    .parse({headers:true})
    .transform(data => ({ 
        sno: data.SNo,
        observation_date: reformatDate(data.ObservationDate),
        province_state: data["Province/State"],
        country: data["Country/Region"],
        last_update: new Date(data["Last Update"]).toISOString(),
        confirmed_cases: ~~data.Confirmed,
        death_cases: ~~data.Deaths,
        recovered_cases: ~~data.Recovered
    }))
    .on("data", (data) => { csvData.push(data); })
    .on("end", () => {
        const cs = new pgp.helpers.ColumnSet(['sno', 'observation_date', 'province_state', 'country', 'last_update', 'confirmed_cases', 'death_cases', 'recovered_cases'], {table: 'covid_observations'});
        const query = pgp.helpers.insert(csvData, cs);
        db.none(query)
        .then(() => console.log(`${csvData.length} rows inserted!`))
        .catch((error) => console.log(error));
    });
    stream.pipe(csvStream);  
}

reformatDate = (date) => {
    let dateArr = date.split('/');
    return `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`;
}

module.exports = {db, initializeTable};