const mysql = require('mysql2')
const dotenv = require('dotenv');
dotenv.config()


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getFirstSemester(matric) {
    const [result] = await pool.query(`
    select com105,
    gns101,
    eed102
    from first_sem_result
    where matric = ?
     `, [matric]);
    return result[0]
}

async function getSecondSemester(matric) {
    const [result] = await pool.query(`
    select com123,
    gns124,
    eed122
    from second_sem_result
    where matric = ?
     `, [matric]);
    return result[0]

}


module.exports = { getFirstSemester, getSecondSemester }

