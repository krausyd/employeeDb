const db = require('../db/connection');
const cTable = require('console.table');

const getAllEmployees = () => {
    const sql = `SELECT e.id, e.first_name, e.last_name, 
    r.job_title as "role name", d.name as department, e.salary, 
    m.first_name as manager 
    FROM employees e INNER JOIN roles r ON e.job = r.id 
    INNER JOIN departments d ON e.department = d.id 
    LEFT OUTER JOIN employees m ON e.manager = m.id`;
    return db.promise().query(sql).then((data) => {
        console.table(data[0])
    });
}

module.exports = getAllEmployees;