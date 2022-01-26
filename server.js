const inquirer = require('inquirer');
const getAllDeparments = require('./lib/department');

const mainQuestionOptions = [
    'view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'leave'
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
            getAllDeparments().catch(err => console.log('An error ocurred, try again later')).then(showMainMenu);
            break;
        case 'view all roles':
            break;
        case 'view all employees':
            break;
        case 'add a department':
            break;
        case 'add a role':
            break;
        case 'add an employee':
            break;
        case 'update an employee role':
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