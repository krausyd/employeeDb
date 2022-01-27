const db = require('../db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');

const getAllDeparments = () => {
    const sql = 'SELECT * FROM departments';
    return db.promise().query(sql).then((data) => {
        console.table(data[0])
    });
};

const addNewDepartment = ( { name }) => {
    const sql = 'INSERT INTO departments (name) VALUES (?)';
    return db.promise().query(sql, [name]).then((data) => {
        console.log('Department added');
    })
};

const promptNewDapartment = () => {
    const questions = [
        {
            name: 'name',
            type: 'input',
            message: 'What\'s the department name?',
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log(`Please enter the ${type} id!`);
                    return false;
                }
            }
        }
    ]
    return inquirer.prompt(questions).then(addNewDepartment);
};

module.exports = { getAllDeparments, promptNewDapartment };