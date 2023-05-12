import mysql from 'mysql2'
import dotenv from 'dotenv'

// const mysql = require('mysql2');
// const dotenv = require('dotenv')
dotenv.config();


const pool = mysql.createPool({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE
}).promise();

export const getQuestions = async () => {
    const [questions] = await pool.query(`
    select *
    from 
    prompts;
    `)
    return questions;

}


export const getQuestion = async (id) => {
    const [result] = await pool.query(`
    select *from prompts
    where id = ? `, [id])
    return result[0];
}

export const askQuestion = async (question, time) => {
    const [data] = await pool.query(`
    insert into prompts(question,time_)
    values(?,current_timestamp)`, [question]);
    let id = data.insertId;
    return getQuestion(id);

}
export const deleteQuestion = async (id) => {
    await pool.query(`
    delete from prompts
    where id = ?`, [id])

}
