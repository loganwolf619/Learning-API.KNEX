const express = require('express')
const app = express()
const data = require('./data')

app.use('/about', (req, res, next) => {
    res.send('MONKEY')
    next();
})


console.log('Anyte');
const port = 8080
app.listen(port , () => {
    console.log ('Server started on port ${port}');
});