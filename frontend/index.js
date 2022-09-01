require('dotenv').config()
const express = require('express')
const app = express();
const exphbs = require('express-handlebars')
const axios = require('axios').default;
const APIURL = "http://" + process.env.API_URL

app.listen(5757 || process.env.port, () => {
    console.log("Express is online!")
})

app.use(express.urlencoded({ extended: true }));

app.use(express.static("/public"));
app.set('views', "./public")

app.engine('.hbs', exphbs.engine({ defaultLayout: false, extname: '.hbs' }));

app.set('view engine', '.hbs');

app.get('/notif', (req, res, next) => {
    res.render('notif')
})

app.get('/users', (req, res, next) => {
    axios.get(APIURL + "/users").then((r) => {
        res.send(r.data);
    })
})

app.get('/login', (req, res, next) => {
    res.render('login')
})

app.post('/login', async(req, res, next) =>{ 
    axios.post(APIURL, {
        REQ_BODY: req.body
    }).then((r) => {

    }).catch((err) => {

    })
})

app.use((err, req, res, next) => {
    if(err) {
        if(process.env.PRODUCTION == "ON") {
            console.log("An error has occured at " + new Date())
            console.log(err.message)
            console.log(err.stack)
            return res.render('error', {
                err: "An error has occured! Please message a developer to thsi web development for more info!"
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