const db = require('../db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');
const { getAllEmployeesByDeparment } = require('./employee');

const getAllDeparments = () => {
    const sql = 'SELECT * FROM departments';
    return db.promise().query(sql).then((data) => {
        console.table(data[0]);
    });
};

const getEmployeesByDeparment = () => {
    const sql = 'SELECT * FROM departments';
    let departmentName;
    let departments;
    return db.promise().query(sql).then((data) => {
        return data[0];
    }).then(departmentData => {
        departments = departmentData;
        return inquirer.prompt({
            name: 'department',
            type: 'list',
            choices: departmentData.map(department => department.name),
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log(`Please select the department!`);
                    return false;
                }
            }
        })
    }).then(data => {
        departmentName = data.department;
        const departmentId = departments.filter(department => department.name === departmentName).map(department => department.id)[0];
        return getAllEmployeesByDeparment(departmentId).then(employeeData => {
            if (!employeeData || employeeData.length === 0) {
                console.log(departmentName, 'doesn\'t have any employees');
            } else {
                console.table(employeeData);
            }
        });
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

module.exports = { getAllDeparments, promptNewDapartment, getEmployeesByDeparment };