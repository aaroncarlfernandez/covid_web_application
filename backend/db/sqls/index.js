const pgp = require('pg-promise')({ capSQL: true });
const {join: joinPath} = require('path');

module.exports = {
    create: sql('queries/create.sql'),
    drop: sql('queries/drop.sql'),
    getTopCountries: sql('queries/getTopCountries.sql'),
    getUnqObsDates: sql('queries/getUnqObsDates.sql'),
    truncate: sql('queries/truncate.sql')
};

function sql(file) {
    const fullPath = joinPath(__dirname, file);
    return new pgp.QueryFile(fullPath, {minify: true});
}