const mysql = require('mysql')
const keys = require('./keys')

const con = mysql.createConnection({
    host: 'localhost',
    database: keys.database,
    user: keys.user,
    password: keys.password
})

function query() {
    con.connect((err) => {
        if (err) throw err
        con.query('FROM users SELECT *', (err, result) => {
            if (err) throw err
            console.log(result)
        })
    })
}