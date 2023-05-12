// import mysql from "mysql2";
// import dotenv from "dotenv"
const mysql = require('mysql2');
const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken');
dotenv.config();
const secretKey = process.env.SECRET_KEY

const connection = mysql.createPool({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE
}).promise();


// database connection and and initializing it with promise for asynchronous callback

const getUsers = async () => {
    try {
        const [users] = await connection.query(`
        select *from users;`);
        return users;

    } catch (error) {
        return new Error(error)
    }
}

const getUser = async (email) => {
    const [user] = await connection.query(`
    select *from users
    where email = ?`, [email]);
    try {
        if (user) {
            return user[0]
        }
    } catch (error) {
        return new Error(error)
    }
}



 const registerUser = async (username, fullname, email) => {
    try {
        const existUser = await getUser(email);
        if (existUser) {
            return ({ message: 'user exist' })
        }
        else {
            const [userData] = await connection.query(`
        insert into users(username, fullname, email)
        values(?, ?, ?)`, [username, fullname, email]);
            const newUser = await getUser(email)
            const token = jwt.sign(newUser, secretKey, { expiresIn: '60d' })
            return token;
        }
    } catch (error) {
        return new Error(error)
    }
}



 const loginUser = async (fullname) => {
    const [user] = await connection.query(`
    select *from players
    where fullname = ?`, [fullname])
    return user[0]
}

module.exports = { loginUser, registerUser, getUser, getUsers }
