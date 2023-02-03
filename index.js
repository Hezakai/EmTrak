const connection = require('./db/connection')
const inquirer = require('inquirer')
require('console.table') 

if (connection) {
    console.log("Datebase is running")
    mainQuestion()
}

function mainQuestion() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainQuestion',
            message: "What would you like to do?",
            choices : ['View Roles', 'View Employees', 'View Departments', 'Add Department','Add Role', 'Add Employee', 'Update Employee', 'Quit']
        }
    ]).then(answer => {
        switch (answer.mainQuestion) {
            case 'View Roles':
                viewRoles()
                break;
            case 'View Employees':
                viewEmployees()
                break;
            case 'View Departments':
                viewDeparments()
                break;
            case 'Add Department':
                addDepartment()
                break;
            case 'Add Role':
                addRole()
                break;
            case 'Add Employee':
                addEmployee()
                break;
            case 'Update Employee':
                updateEmployee()
                break;
            default:
                connection.end()
        }
    })
}

//    connection.query("SELECT favorite_books.book_name AS name, book_prices.price AS price FROM favorite_books JOIN book_prices ON favorite_books.book_price = book_prices.id")

function viewRoles() {
    console.log('view all tables in a join')
    connection.query("SELECT role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id", (err, data) => {
        if (err) throw err;
        console.log("")
        console.table(data)
    })
    mainQuestion()
}

function viewEmployees() {
    console.log('view only employees table');
    connection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.table(data)
    })
    mainQuestion()
}

function viewDeparments() {
    connection.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.table(data)
    })
    mainQuestion()
}


function addDepartment() {
    console.log('addDepartment')
    mainQuestion()
}


function addRole() {
    console.log('addRole')
    mainQuestion()
}


function addEmployee() {
    console.log('addEmployee')
    mainQuestion()
}


function updateEmployee() {
    console.log('updateEmployee')
    //query emp id from user
    mainQuestion()
}


