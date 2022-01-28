const db = require('../db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');

const getAllRoles = () => {
    const sql = 'SELECT roles.id, job_title as "role name", salary, name as department FROM roles INNER JOIN departments ON roles.department = departments.id';
    return db.promise().query(sql).then((data) => {
        console.table(data[0])
    });
}

const addNewRole = () => {
    const sqlDeparments = 'SELECT * FROM departments';
    return db.promise().query(sqlDeparments).then((departments) => {
        const departmentNames = departments[0].map(department => department.name); 4
        const questions = [
            {
                name: 'name',
                type: 'input',
                message: 'What\'s the role name?',
                validate: userInput => {
                    if (userInput) {
                        return true;
                    } else {
                        console.log(`Please enter the name!`);
                        return false;
                    }
                }
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What\'s the salary for the role?',
                validate: userInput => {
                    if (userInput) {
                        return true;
                    } else {
                        console.log(`Please enter the salary!`);
                        return false;
                    }
                }
            }
            ,
            {
                name: 'department',
                type: 'list',
                message: 'What\'s department?',
                choices: departmentNames,
                validate: userInput => {
                    if (userInput) {
                        return true;
                    } else {
                        console.log(`Please enter the department!`);
                        return false;
                    }
                }
            }
        ]
        return inquirer.prompt(questions).then(data => {
            const sql = 'INSERT INTO roles (job_title, department, salary) VALUES (?, ?, ?)';
            const departmentId = departments[0][departments[0].findIndex(i => i.name === data.department)].id;
            return db.promise().query(sql, [data.name, departmentId, data.salary]).then((data) => {
                console.log('Role added');
            });
        });
    });
};

module.exports = { getAllRoles, addNewRole };