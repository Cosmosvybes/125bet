const express = require('express');
const port = process.env.PORT || 1987;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world')
})
app.listen(() => { console.log(`Server activated on ${port}`) })