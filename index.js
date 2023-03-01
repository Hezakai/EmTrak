const connection = require('./db/connection')
const inquirer = require('inquirer')
require('console.table')

if (connection) {
    console.log("Datebase has been successfully Initialized")
    mainMenu()
}

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: `\n
            #######        #######                      
            #       #    #    #    #####    ##   #    # 
            #       ##  ##    #    #    #  #  #  #   #  
            #####   # ## #    #    #    # #    # ####   
            #       #    #    #    #####  ###### #  #   
            #       #    #    #    #   #  #    # #   #  
            ####### #    #    #    #    # #    # #    # \n\n\nWelcome to EmTrack\nMain Menu\nWhat would you like to do?\n`,
            choices: ['View Records', 'Add A New Record', 'Update A Record', 'Quit']
        }
    ]).then(answer => {
        switch (answer.mainMenu) {
            case 'View Records':
                viewMenu()
                break;
            case 'Add A New Record':
                addMenu()
                break;
            case 'Update A Record':
                updateEmployeeRole()
                break;
            default:
                connection.end()
        }
    })
}

function viewMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'viewMenu',
            message: "\nView Records Menu\nPlease Select an option to continue\n",
            choices: ['View Roles', 'View Employees', 'View Departments', 'Main Menu']
        }
    ]).then(answer => {
        switch (answer.viewMenu) {
            case 'View Roles':
                viewRoles()
                break;
            case 'View Employees':
                viewEmployees()
                break;
            case 'View Departments':
                viewDeparments()
                break;
            default:
                mainMenu()
        }
    })
}

function addMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'addMenu',
            message: `\nAdd Record Menu\nPlease select an option to continue`,
            choices: ['Add Department', 'Add Role', 'Add Employee', 'Main Menu']
        }
    ]).then(answer => {
        switch (answer.addMenu) {
            case 'Add Department':
                addDepartment()
                break;
            case 'Add Role':
                addRole()
                break;
            case 'Add Employee':
                addEmployee()
                break;
            default:
                mainMenu()
        }
    })
}

function viewRoles() {
    console.log('view all tables in a join')
    connection.query("SELECT role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id", (err, data) => {
        if (err) throw err;
        console.log("\n\n")
        console.table(data)
        console.log("\n\nPress Enter to continue...\n")
    })
    mainMenu()
}

function viewEmployees() {
    console.log('view only employees table');
    connection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.log("\n\n")
        console.table(data)
        console.log("\n\nPress Enter to continue...\n")
    })
    mainMenu()
}

function viewDeparments() {
    connection.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.log("\n\n")
        console.table(data)
        console.log("\n\nPress Enter to continue...\n")
    })
    mainMenu()
}


function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the department name:'
            },
        ])
        .then(answers => {
            const { name } = answers;

            let updateStatement = `INSERT INTO department (name) VALUES (?)`;

            connection.query(updateStatement, [name], (error, results) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(`Successfully created the ${name}`);
                }
                addMenu();
            });
        });
}



function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the role title:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter role salary:'
            },
            {
                type: 'input',
                name: 'department',
                message: 'Enter the department:'
            },
        ])
        .then(answers => {
            const { title, salary, department } = answers;

            let updateStatement = `INSERT INTO role (title, salary, department_id) VALUES ('${title}', '${salary}', '${department}')`;

            connection.query(updateStatement, (error, results) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(`Successfully created ${title} ${salary} to department ID# ${department}`);
                }
            });
            addMenu()
        });
}


function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'nameFirst',
                message: 'Enter the first name of the employee you want to add:'
            },
            {
                type: 'input',
                name: 'nameLast',
                message: 'Enter the last name of the employee you want to add:'
            },
            {
                type: 'input',
                name: 'role',
                message: 'Enter the new Employee role:'
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Enter the manager ID#:'
            },
        ])
        .then(answers => {
            const { nameFirst, nameLast, role, manager } = answers;

            let updateStatement = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${nameFirst}', '${nameLast}', '${role}', '${manager}')`;

            connection.query(updateStatement, (error, results) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(`Successfully created ${nameFirst} ${nameLast} to role ID# ${role}`);
                }
            });
            addMenu()
        });
}


function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the employee you want to update:'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name of the employee you want to update:'
            },
            {
                type: 'input',
                name: 'newRole',
                message: 'Enter the new Employee role:'
            },
        ])
        .then(answers => {
            const { firstName, lastName, newRole } = answers;

            let updateStatement = `UPDATE employee SET role_id = '${newRole}' WHERE first_name = '${firstName}' AND last_name = '${lastName}'`;

            connection.query(updateStatement, (error, results) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(`\n\nSuccessfully updated ${firstName} ${lastName} to role ID# ${newRole}\n\n`);
                }
            });
            mainMenu()
        });
}


