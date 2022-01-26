const inquirer = require('inquirer');

const mainQuestionOptions = [
    'view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'
]
const mainQuestion = {
    name: 'menu',
    message: 'What would you like to do?',
    type: 'list',
    choices: mainQuestionOptions
};

const promptWhatToDo = () => {
    return inquirer.prompt(mainQuestion);
}

const showNext = (option) => {
    console.log(option);
}

const showMainMenu = () => {
    promptWhatToDo().then(showNext);
}

showMainMenu();