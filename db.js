const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config();
const pool = mysql.createPool({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE

}).promise()

async function getRecords() {
    const [records] = await pool.query(`
    select *from
    taskboard`);
    return records

}

const getIndivdualRecord = async (id) => {
    const [record] = await pool.query(`
    select *from
    taskboard
    where id = ?`, [id])
    return record[0];
}


const creatRecord = async (title, reminder) => {
    const [record] = await pool.query(`
    insert into taskboard(title, timedue, reminder)
    values(?, current_timestamp, ?)`, [title, reminder]);
    const id = record.insertId
    return getIndivdualRecord(id)

}

const updateRecord = async (name, firstname, email) => {
    const [record] = await pool.query(`
    update bed_student
    set surname = ? ,
    firstname = ?
    where email = ? `, [name, firstname, email])

    return getIndivdualRecord(email)
}




const deletRecord = async (id) => {
    const record = await pool.query(`
    delete from taskboard
    where id = ? `, [id])
    return record[0]
}


module.exports = { getIndivdualRecord, getRecords, creatRecord, updateRecord, deletRecord }
