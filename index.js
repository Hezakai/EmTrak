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
            choices : ['View All', 'View Employees', 'View Departments', 'Quit']
        }
    ]).then(answer => {
        switch (answer.mainQuestion) {
            case 'View All':
                viewAll()
                break;
            case 'View Employees':
                viewEmployees()
                break;
            case 'View Departments':
                viewDeparments()
                break;
            default:
                connection.end()
        }
    })
}

function viewAll() {
    console.log('view all tables in a join')

    mainQuestion()
}

function viewEmployees() {
    console.log('view only employees table');
    mainQuestion()
}

function viewDeparments() {
    connection.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.table(data)
    })
    mainQuestion()
}