const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const { loginUser, registerUser } = require('./User.js')
const { checkResult, getBet, getUser, getUsers, popColors, updateBalance, placeBet } = require('./125.js')
// import express from 'express'
// import bodyParser from 'body-parser';
// import { getQuestions, getQuestion, askQuestion, deleteQuestion } from'./buzzClan.js'
const port = process.env.PORT || 1990;
// import cors from 'cors';
// import jwt from 'jsonwebtoken'
// import { askAnything } from'./gpt.js'
// import cookieParser from 'cookie-parser';
// import { loginUser, registerUser } from './User.js';
// import { checkResult, getBet, getUser, getUsers, popColors, updateBalance, placeBet } from './125.js'

// const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname))
app.options('/login', cors())



// let sessionStore = new mysqlStore({})
// app.use(session({
//     saveUninitialized: true,
//     key: "cat",
//     store: sessionStore,
//     resave: false,


//     secret: "coolCat",
// }));




const Auth = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        res.send('user not authorized')
    }
    const data = jwt.verify(token, process.env.SECRET_KEY)
    req.user = data;
    next()

}

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/125.js')
});


app.get('/player', Auth, async (req, res) => {
    const user = await getUser(req.user.id)
    res.status(200).send(user)
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html')
});



app.get('/playgame', Auth, (req, res) => {
    res.sendFile(__dirname + '/125.html')
})

app.get('/user/profile', Auth, (req, res) => {
    res.send({ name: `${req.user.fullname}`, balance: `${req.user.balance}` })
});



app.post('/login', cors({ origin: 'http://localhost:1990/login', optionsSuccessStatus: 200, credentials: true, exposedHeaders: ['Content-Range', 'X-Content-Range'] }), async (req, res) => {
    const { fullname, password } = req.body;
    try {
        const user = await loginUser(fullname);
        if (user) {
            if (user.password === password) {
                // /Authenticate the user and the user password
                const jwt_ = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1d' }); //sign the the fetched user data with secret key
                res.cookie('token', jwt_, { maxAge: (60000 * 100), httpOnly: true, path: "/popcolors/placebet" }) // parsing the token as cookie to the the response header for the pathe to play game
                res.cookie('token', jwt_, { maxAge: (60000 * 100), httpOnly: true, path: "/" })//parsing cookie for the home page route
                res.cookie('token', jwt_, { maxAge: (60000 * 100), httpOnly: true, path: "/user/profile" })
                res.cookie('token', jwt_, { maxAge: (60000 * 100), httpOnly: true, path: '/placebet' })// parsing cookie for the game page
                res.setHeader("Content-Type", "text/html");
                res.setHeader('Access-Control-Allow-Credentials', 'true');
                res.redirect(302, '/playgame')
            }
            else {
                res.status(403).send('incorrect password')
            }
        }
    } catch (error) {
        res.status(403).send(new Error(error))
    }
})



app.get('/user/:id/betlist', async function (req, res) {
    const id = req.params.id;
    const betlist = await getBet(id);
    res.send(betlist)
});


app.get('/question/:id', async (req, res) => {
    const id = req.params.id;
    const question = await getQuestion(id);
    res.send(question)
})

app.get('/users', Auth, async function (req, res) {
    const users = await getUsers();
    res.send(users)
})

app.get('/questions', async function (req, res) {
    const questions = await getQuestions()
    res.send(questions)
});


app.delete('/question/:id', async (req, res) => {
    const id = req.params.id;
    await deleteQuestion(id);

});


app.post('/question', async (req, res) => {
    const { question } = req.body
    try {
        const question_ = await askQuestion(question)
        // res.send(question_)

    } catch (error) {
        res.send(new Error(error))

    }
});


app.post('/popcolors', Auth, async (req, res) => {
    const id = req.user.id
    var pot_Winning;
    const { playerChoice, gameType, stake } = req.body;
    const player = await getUser(id);
    try {
        if (player) {
            var game = await checkResult(popColors, playerChoice, gameType, stake);
            if (game.status == 'won ticket') {
                pot_Winning = game.potential_Winning;
                player.balance += pot_Winning
                await updateBalance(id, (player.balance));
            }
            else {
                pot_Winning = 0
            }
            res.send({ game: game, winning: pot_Winning })
        }
        else {
            res.status(403).send('user not logged in')
        }
    } catch (error) {
    }
});



app.post('/placebet', Auth, async (req, res) => {
    const { gameType, colorChoice, stake } = req.body
    const id = req.user.id;
    const user = await getUser(id);
    if (user["balance"] < 100) {
        res.status(403).send("fund your account , balance too low to stake, please add more funds")
    }
    else {
        var game = await placeBet(gameType, colorChoice, stake, id);
        user.balance -= stake;
        await updateBalance(id, user.balance);
        res.status(200).send({ game: game, balance: user.balance })
    }
});




app.post('/response', async (req, res) => {
    const { query } = req.body
    const data = await askAnything(query)
    res.send(data)

})


// app.get('/blog/posts', async (req, res) => {
//     const posts = await getPosts()
//     res.status(200).send(posts)
// });

// app.get('/blog/posts/:id', async (req, res) => {
//     const id = req.params.id
//     const post = await getPost(id);
//     res.status(200).send(post)
// });


// app.patch('/blog/posts', async (req, res) => {
//     const { id, title } = req.body
//     const data = await updatePost(title, id)
//     res.status(301).send(data)
// })







app.listen(port, () => { console.log(`Server connected on port ${port} `) })
