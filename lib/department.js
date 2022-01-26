const db = require('../db/connection');
const cTable = require('console.table');

const getAllDeparments = () => {
    const sql = 'SELECT * FROM departments';
    return db.promise().query(sql).then((data) => {
        console.table(data[0])
    });

}

module.exports = getAllDeparments;