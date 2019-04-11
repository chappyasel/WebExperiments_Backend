const mysql = require('mysql')
const keys = require('./keys')

const pool = mysql.createPool({
    host: 'localhost',
    database: keys.database,
    user: keys.user,
    password: keys.password
})

module.exports = {

    query: function(callback) {
        pool.getConnection((err, con) => {
            try {
                if (con) {
                    con.query('SELECT * FROM users', (err, result) => {
                        callback(err, result)
                    })
                    con.release()
                }
            }
            catch (err) {
                callback(err, null)
            }
            callback(err, null)
        })
    }

}

