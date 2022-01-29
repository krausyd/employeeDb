const db = require('../db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');

const getAllEmployees = () => {
    const sql = `SELECT e.id, e.first_name, e.last_name, 
    r.job_title as "role name", d.name as department, r.salary, 
    m.first_name as manager 
    FROM employees e INNER JOIN roles r ON e.job = r.id 
    INNER JOIN departments d ON e.department = d.id 
    LEFT OUTER JOIN employees m ON e.manager = m.id`;
    return db.promise().query(sql).then((data) => {
        console.table(data[0])
    });
};

const getEmployeesByManager = () => {
    let employees = [];
    let sql = 'SELECT id, first_name, last_name FROM employees';
    let managerId;
    let managerName;
    return db.promise().query(sql).then(data => {
        return data[0];
    }).then(employeeData => {
        employees = employeeData;
        return inquirer.prompt({
            name: 'employee',
            type: 'list',
            message: 'Which manager would like to get their direct reports?',
            choices: employees.map(employee => employee.first_name + ' ' + employee.last_name),
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log(`Please select a manager!`);
                    return false;
                }
            }
        });
    }).then(data => {
        managerName = data.employee;
        managerId = employees.filter(employee => employee.first_name + ' ' + employee.last_name === data.employee).map(employee => employee.id)[0];
        sql = 'SELECT * FROM employees WHERE manager = ?';
        return db.promise().query(sql, [managerId]).then(data => {
            return data[0];
        })
    }).then(employeeData => {
        if (!employeeData || employeeData.length === 0) {
            console.log(managerName, ' doesn\'t have any direct report');
        } else {
            console.table(employeeData);
        }
    });
};

const updateEmployeeManager = () => {
    let employees = [];
    let sql = 'SELECT id, first_name, last_name FROM employees';
    let employeeId;
    return db.promise().query(sql).then(data => {
        return data[0];
    }).then(employeeData => {
        employees = employeeData;
        return inquirer.prompt({

            name: 'employee',
            type: 'list',
            message: 'Which employee would like to change manager?',
            choices: employees.map(employee => employee.first_name + ' ' + employee.last_name),
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log(`Please select an employee!`);
                    return false;
                }
            }
        });
    }).then(data => {
        employeeId = employees.filter(employee => employee.first_name + ' ' + employee.last_name === data.employee).map(employee => employee.id)[0];
        return inquirer.prompt({
            name: 'manager',
            type: 'list',
            message: 'Which manager would be the new manager?',
            choices: employees.filter(employee => employee.id !== employeeId).map(employee => employee.first_name + ' ' + employee.last_name),
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log(`Please select a manager!`);
                    return false;
                }
            }
        });
    }).then(data => {
        const managerId = employees.filter(employee => employee.first_name + ' ' + employee.last_name === data.manager).map(employee => employee.id)[0];
        const sql = 'UPDATE employees SET manager = ? WHERE id = ?';
        return db.promise().query(sql, [managerId, employeeId]).then((data) => {
            console.log('Employee\'s manager updated');
        });
    })
};

const updateEmployeeRole = () => {
    let employees = [];
    let roles = [];
    let sql = 'SELECT id, first_name, last_name FROM employees';
    return db.promise().query(sql).then(data => {
        return data[0];
    }).then(employeeData => {
        employees = employeeData;
        sql = 'SELECT id, job_title FROM roles';
        return db.promise().query(sql).then(data => {
            return data[0];
        });
    }).then(rolesData => {
        roles = rolesData;
        const questions = [
            {
                name: 'employee',
                type: 'list',
                message: 'Which employee would like to change role?',
                choices: employees.map(employee => employee.first_name + ' ' + employee.last_name),
                validate: userInput => {
                    if (userInput) {
                        return true;
                    } else {
                        console.log(`Please select an employee!`);
                        return false;
                    }
                }
            },
            {
                name: 'role',
                type: 'list',
                message: 'What\'s the employee\'s new job title?',
                choices: roles.map(role => role.job_title),
                validate: userInput => {
                    if (userInput) {
                        return true;
                    } else {
                        console.log(`Please select the jobs title!`);
                        return false;
                    }
                }
            }];
        return inquirer.prompt(questions).then(data => {
            const sql = 'UPDATE employees SET job = ? WHERE id = ?';
            const jobId = roles.filter(role => role.job_title === data.role).map(role => role.id)[0];
            const employeeId = employees.filter(employee => employee.first_name + ' ' + employee.last_name === data.employee).map(employee => employee.id)[0];
            return db.promise().query(sql, [jobId, employeeId]).then((data) => {
                console.log('Employee\'s role updated');
            });
        });
    });
};

const addNewEmployee = () => {
    let sql = 'SELECT * FROM departments';
    let departments = [];
    let roles = [];
    let managers = [];
    return db.promise().query(sql).then((data) => {
        return data[0];
    }).then(departmentsData => {
        departments = departmentsData;
        sql = 'SELECT id, job_title FROM roles';
        return db.promise().query(sql).then(data => {
            return data[0];
        });
    }).then(rolesData => {
        roles = rolesData;
        sql = 'SELECT id, first_name, last_name FROM employees';
        return db.promise().query(sql).then(data => {
            return data[0];
        });
    }).then(managersData => {
        managers = managersData;
        const questions = [
            {
                name: 'first',
                type: 'input',
                message: 'What\'s the employee\'s first name?',
                validate: userInput => {
                    if (userInput) {
                        return true;
                    } else {
                        console.log(`Please enter the first name!`);
                        return false;
                    }
                }
            },
            {
                name: 'last',
                type: 'input',
                message: 'What\'s the employee\'s last name?',
                validate: userInput => {
                    if (userInput) {
                        return true;
                    } else {
                        console.log(`Please enter the last name!`);
                        return false;
                    }
                }
            },
            {
                name: 'department',
                type: 'list',
                message: 'What\'s the employee\'s department?',
                choices: departments.map(department => department.name),
                validate: userInput => {
                    if (userInput) {
                        return true;
                    } else {
                        console.log(`Please enter the department!`);
                        return false;
                    }
                }
            },
            {
                name: 'role',
                type: 'list',
                message: 'What\'s the employee\'s job title?',
                choices: roles.map(role => role.job_title),
                validate: userInput => {
                    if (userInput) {
                        return true;
                    } else {
                        console.log(`Please enter the jobs title!`);
                        return false;
                    }
                }
            },
            {
                name: 'manager',
                type: 'list',
                message: 'Who\'s the employee\'s manager?',
                choices: managers.map(manager => manager.first_name + ' ' + manager.last_name),
                validate: userInput => {
                    if (userInput) {
                        return true;
                    } else {
                        console.log(`Please select the manager!`);
                        return false;
                    }
                }
            }];
        return inquirer.prompt(questions).then(data => {
            const sql = 'INSERT INTO employees (first_name, last_name, job, department, manager) VALUES (?, ?, ?, ?, ?)';
            const departmentId = departments.filter(department => department.name === data.department).map(department => department.id)[0];
            const jobId = roles.filter(role => role.job_title === data.role).map(role => role.id)[0];
            const managerId = managers.filter(manager => manager.first_name + ' ' + manager.last_name === data.manager).map(manager => manager.id)[0];
            return db.promise().query(sql, [data.first, data.last, jobId, departmentId, managerId]).then((data) => {
                console.log('Role added');
            });
        });
    });
};

/*
(async () => {
    const ans1 = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?",
        default: "Jake",
      },
    ]);
    const ans2 = await inquirer.prompt([
      {
        type: "confirm",
        name: "summary",
        message: "Is this information correct? Your name is:" + ans1.name,
      },
    ]);
    return { ...ans1, ...ans2 };
  })()
    .then(console.log)
    .catch(console.error);*/

module.exports = { getAllEmployees, addNewEmployee, updateEmployeeRole, updateEmployeeManager, getEmployeesByManager };