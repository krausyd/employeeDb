const db = require('../db/connection');
const cTable = require('console.table');

const getAllRoles = () => {
    const sql = 'SELECT roles.id, job_title as "role name", name as department FROM roles INNER JOIN departments ON roles.department = departments.id';
    return db.promise().query(sql).then((data) => {
        console.table(data[0])
    });
}

module.exports = getAllRoles;