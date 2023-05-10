const express = require('express');
const port = process.env.PORT || 1616;
const app = express();


app.get('/', (req, res) => {
    res.send('Hello world')
})
app.listen(() => { console.log(`Server up and runinng on ${port}`) })


