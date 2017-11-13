var mysql = require('mysql');

module.exports = {
    pool:  mysql.createPool({
            host: '192.168.2.120',
            port: '3306',
            user: 'root',
            password: '',
            database: 'test55'
        })    
}