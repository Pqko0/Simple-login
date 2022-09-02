require('dotenv').config()
const express = require('express')
const app = express();
const exphbs = require('express-handlebars')
const axios = require('axios').default;
const APIURL = "http://" + process.env.API_URL
const cookie = require('cookie-parser')
// const localStorage = require('node-localstorage')

app.listen(5757 || process.env.port, () => {
    console.log("Express is online!")
})

app.use(express.json());
app.use(cookie())

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

app.get('/register', (req, res, next) => {
    res.render('register')
})

app.get('/reset', (req, res, next) => {
    res.render("reset")
})

//POST
app.post('/login', async(req, res, next) =>{ 
    console.log("POST /login")
    axios.post(APIURL + "/login", {
        REQ_BODY: req.body
    }).then((r) => {
        return res.send({
            url: r.data.url
        })
    }).catch((err) => {
        console.log(err.message)
        return res.send({
            url: '/notif?message=Backend may not be online!'
        })
    })
})

app.post('/register', (req, res, next) => {
    axios.post(APIURL + "/register", {
        REQ_BODY: req.body.data
    }).then((r) => {
        return res.send({
            url: r.data.url
        })
    }).catch((err) => {
        console.log(err.message)
        return res.send({
            url: '/notif?message=Backend may not be online!'
        })
    })
}) 

app.post('/reset', (req, res, next) => {
    axios.post(APIURL + "/register", {
        REQ_BODY: req.body.data
    }).then((r) => {
        return res.send({
            url: r.data.url
        })
    }).catch((err) => {
        console.log(err.message)
        return res.send({
            url: '/notif?message=Backend may not be online!'
        })
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
            return res.json({
                message: "An error has occured!",
                err_msg: err.message,
                err_stck: err.stack
            })
        }
    }
    next();
})