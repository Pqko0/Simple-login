require('dotenv').config()
const express = require('express')
const app = express();
const exphbs = require('express-handlebars')
const path = require('path')
const APIURL = process.env.API_URL

app.listen(5757 || process.env.port, () => {
    console.log("Express is online!")
})

app.use(express.urlencoded({ extended: true }));

app.use(express.static("/public"));
app.set('views', "./public")

app.engine('.hbs', exphbs.engine({ defaultLayout: false, extname: '.hbs' }));

app.set('view engine', '.hbs');

app.get('/login', (req, res, next) => {
    res.render('login')
})

app.use((err, req, res, next) => {
    if(err) {
        if(process.env.PRODUCTION == "ON") {
            return res.send({
                message: "An error has occured!",
                err_msg: err.message
            })
        } else {
            return res.send({
                message: "An error has occured!",
                err_msg: err.message,
                err_stck: err.stack
            })
        }
    }
    next()
})