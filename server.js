const inquirer = require('inquirer');
const { getAllDeparments, promptNewDapartment, getEmployeesByDeparment } = require('./lib/department');
const { getAllRoles, addNewRole } = require('./lib/role');
const { getAllEmployees, addNewEmployee, updateEmployeeRole, updateEmployeeManager, getEmployeesByManager } = require('./lib/employee');

const mainQuestionOptions = [
    'view all departments',
    'view all roles',
    'view all employees',
    'add a department',
    'add a role',
    'add an employee',
    'update an employee role',
    'update an employee manager',
    'get employees by manager',
    'get employees by department',
    'leave'
]
const mainQuestion = {
    name: 'option',
    message: 'What would you like to do?',
    type: 'list',
    choices: mainQuestionOptions
};

const promptWhatToDo = () => {
    return inquirer.prompt(mainQuestion);
}

const showNext = ({ option }) => {
    switch (option) {
        case 'view all departments':
            getAllDeparments().catch(err => console.log('An error ocurred, try again later', err)).then(showMainMenu);
            break;
        case 'view all roles':
            getAllRoles().catch(err => console.log('An error ocurred, try again later', err)).then(showMainMenu);
            break;
        case 'view all employees':
            getAllEmployees().catch(err => console.log('An error ocurred, try again later', err)).then(showMainMenu);
            break;
        case 'add a department':
            promptNewDapartment().catch(err => console.log('An error ocurred, try again later', err)).then(showMainMenu);
            break;
        case 'add a role':
            addNewRole().catch(err => console.log('An error ocurred, try again later', err)).then(showMainMenu);
            break;
        case 'add an employee':
            addNewEmployee().catch(err => console.log('An error ocurred, try again later', err)).then(showMainMenu);
            break;
        case 'update an employee role':
            updateEmployeeRole().catch(err => console.log('An error ocurred, try again later', err)).then(showMainMenu);
            break;
        case 'update an employee manager':
            updateEmployeeManager().catch(err => console.log('An error ocurred, try again later', err)).then(showMainMenu);
            break;
        case 'get employees by manager':
            getEmployeesByManager().catch(err => console.log('An error ocurred, try again later', err)).then(showMainMenu);
            break;
        case 'get employees by department':
            getEmployeesByDeparment().catch(err => console.log('An error ocurred, try again later', err)).then(showMainMenu);
            break;
        case 'leave':
            console.log('Thanks for using the system!');
            break;
    }
}

const showMainMenu = () => {
    promptWhatToDo().then(showNext);
}

console.log('Welcome to the application employeesDb');
showMainMenu();