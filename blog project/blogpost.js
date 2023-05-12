
import mysql from "mysql2";
import dotenv from 'dotenv'
dotenv.config();

const pool = mysql.createPool({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE
}).promise();



const getPosts = async () => {
    const [posts] = await pool.query(`
    select *from blognode
    `)
    return posts
};

const getPost = async (id) => {
    const [post] = await pool.query(`
select *from blognode
where id =?`, [id])
    return post[0]
}


const createPost = async (title, body, time) => {
    const [post] = await pool.query(`
    insert into blognode(title, body, post_time)
    values(?, ?, current_timestamp)`, [title, body])
    const id = post.insertId
    return getPost(id);
}

const deletePost = async (id) => {
    const [data] = await pool.query(`
    delete from blognode
    where id = ?`, [id]
    )
    return data;
}

const updatePost = async (id, title) => {
    const post = await pool.query(`
    update blognode
    set title = ? 
    where id = ?`, [id, title])
    return post[0]

}

const getpost = await getPosts();
console.log(getpost)

// module.exports = { getPost, getPosts, updatePost, deletePost }