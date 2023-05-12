
const mysql = require('mysql2');
const dotenv = require('dotenv')
// import mysql from "mysql2";
// import dotenv from "dotenv"
dotenv.config()

const connection = {
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE
}
const pool = mysql.createPool(connection).promise();


async function getBetPlaced() {
    const [bets] = await pool.query(`
    select *from betlist`);
    return bets;
}


async function getUsers() {
    const [users] = await pool.query(`
    select *from players`);
    return users;
}


async function getBetList(id) {
    const [data] = await pool.query(`
    select *from betlist
    where id = ?`, [id]);
    return data
}

async function getUser(id) {
    const [user] = await pool.query(`select *from players where id = ?`, [id]);
    return user[0];
}



async function createUser(fullname) {
    const regID = Math.floor(Math.random() * 1000 + 20230);
    const [player] = await pool.query(`
    insert into players(id,fullname)
    values(${regID}, ?)`, [userId, fullname])
    var id = player.insertId
    try {
        return await getUser(id)
    } catch (error) {
        return new Error(error)
    }
};



async function placeBet(gameType, colorChoice, stake, userId) {
    var randomNum = Math.floor(Math.random() * 6);
    var Alpha = ["A", 'B', "C", "D", "E", "Z", "Q"];
    var randomString = Alpha[randomNum]
    const ticketID = Math.floor(Math.random() * 10000 + 20010 );
    const betStake = await pool.query(`
    insert into betlist(id, game_type, color_choice,stake,user_id, time_)
    values(${ticketID}, ?,?,?,?,current_timestamp)`, [gameType, colorChoice, stake, userId]);
    if (betStake) {
        return getBet(userId)
    }
    else { return }
};



// var placebet = await placeBet('last two', 'blue', 200, 20266, 5000)
// console.log(placebet)

async function getBet(userId) {
    const [bets] = await pool.query(`
    select *from betlist 
    where user_id = ?`, [userId])
    return bets;
};



async function popColors() {
    var colors = ['red', 'blue', 'green', 'black', 'yellow']
    var randumNum = Math.floor(Math.random() * 5);
    var randumNum2 = Math.floor(Math.random() * 5)
    var randumNum3 = Math.floor(Math.random() * 5)
    var randumNum4 = Math.floor(Math.random() * 5)
    var randumNum5 = Math.floor(Math.random() * 5);

    var outcomeColors = {
        first: colors[randumNum],
        second: colors[randumNum2],
        third: colors[randumNum3],
        fourth: colors[randumNum4],
        fifth: colors[randumNum5]
    }
    const { first, second, third, fourth, fifth } = outcomeColors;
    const gameWithResult = await setColors(first, second, third, fourth, fifth);
    return { game: gameWithResult }
}


async function checkResult(colors, playerColor, type, stake) {
    const result = await colors()
    var outCome;
    const { id, color1, color2, color3, color4, color5 } = result['game']
    var firstThree = [color1, color2, color3].includes(playerColor)
    var lastTwo = [color4, color5].includes(playerColor);
    // var two_ofThree = [color1, color2,color3].includes(playerColor)
    if (type == '1st three') {
        outCome = firstThree ? 'won ticket' : 'lost ticket';
        var pot_Winning = stake * 2.0;
    }
    else if (type == "last two") {
        outCome = lastTwo ? 'won ticket' : 'lost ticket';
        var pot_Winning = stake * 3.0;
    }
    else if (type == 'combo') {
        outCome = firstThree && lastTwo ? 'won ticket' : 'lost ticket';
        var pot_Winning = stake * 4.0;
    }
    return { playerChoice: playerColor, message: 'bet successfully placed, goodluck!', stake: stake, potential_Winning: pot_Winning, gameType: type, status: outCome, resultingColors: result['game'] }

}




async function setColors(color1, color2, color3, color4, color5) {
    const [insertResult] = await pool.query(`
    insert into colors(color1,color2,color3,color4,color5, result_timestamp)
    values(?,?,?,?,?, current_timestamp)`, [color1, color2, color3, color4, color5])
    const gameID = insertResult.insertId
    return getGame(gameID)
}

async function getGame(id) {
    const [game] = await pool.query(`
    select *from colors 
    where id = ?`, [id]);
    return game[0]
}


async function updateBalance(id, balance) {
    await pool.query(`
    update players
    set balance = ${balance}
    where id = ?`, [id]);
    return "balance updated"
};



// const data = await updateBalance(20266, 5000)
// console.log(data)


module.exports = { getUser, placeBet, updateBalance, checkResult, popColors }

