const mysql = require('mysql')
const keys = require('./keys')

const con = mysql.createConnection({
    host: 'localhost',
    database: keys.database,
    user: keys.user,
    password: keys.password
})

module.exports = {

    query: function(callback) {
        con.connect((err) => {
            if (err) callback(err, null)
            con.query('SELECT * FROM users', (err, result) => {
                callback(err, result)
            })
        })
    }

}

