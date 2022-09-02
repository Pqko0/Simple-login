require('dotenv').config()
const express = require('express')
const app = express();
const {sha256} = require('js-sha256')
const mongoose = require('mongoose')
const port = process.env.PORT || 9494
var badwrds = require('bad-words'),
       bds = new badwrds();
const mailer = require('nodemailer').createTransport({
    host: process.env.EMAIL_SMTP,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Mongoose is ready!")
})

const register = process.env.REGISTER

const users = mongoose.model('users', mongoose.Schema({
    id: Number,
    email: String,
    username: String,
    password: String,
}))

const reset = mongoose.model('reset', mongoose.Schema({
    id: Number,
    secret: String,
    expiresIn: Date
}))

const encrypt = async (data) => sha256.hmac(process.env.SECRET, data);

app.use(express.json())

app.listen(port, ()  => {
    console.log("Express listening on port " + port);
})

app.get('/users', async (req, res, next) => {
    const userList = await JSON.parse(JSON.stringify(await users.find()));

    for(let i = 0; i < userList.length;i++) {
        delete userList[i]._id;
        delete userList[i].__v;
        delete userList[i].password;
        if(process.env.EMAIL == "FALSE") {
            delete userList[i].email;
        }
    }

    res.send(userList)
})

app.post('/login', async(req, res, next) => {
    const bodySent = req.body;
    if(!bodySent.username || !bodySent.password) return res.send({
        url: "?error=true"
    })

    users.findOne({
        username: bodySent.username,
        password: await encrypt(bodySent.password)
    }, function(err, usr) {
        if(err) return res.send({
            url: '/notif?message="Database error occured!"'
        })
        if(!usr) return res.send({
            url: "?error=true"
        })

        res.send({
            data: usr,
            url: "/dashboard"
        })
    })
})

app.post('/register', async(req, res) => {
    const reqBody = req.body.REQ_BODY;
    if(!reqBody.username || !reqBody.email || !reqBody.password || !reqBody.cpassword) return res.send({
        url: "?error=true&message=Missing data"
    })

    const user = bds.clean(reqBody.username)
    const email = reqBody.email
    const pass = reqBody.password
    const cpass = reqBody.cpassword

    if(user.length < 3) res.send({
        url: "?error=true&message=Username must be bigger than 3 letters"
    })

    if(email.length < 5 || !email.includes("@") || !email.includes(".")) return res.send({
        url: "?error=true&message=Invalid Email"
    })

    if(pass.length < 8 ) return res.send({
        url: "?error=true&message=Password must be bigger than 8 letters!"
    })

    if(pass !== cpass) return res.send({
        url: "?error=true&message=Passwords don't match!"
    })

    let userID = Math.floor(Math.random() * (9999999999 - 1000000000)) + 1000000000

    function checkID() {
        users.findOne({id:userID}, function(err, usr) {
            if(usr) userID = Math.floor(Math.random() * (9999999999 - 1000000000)) + 1000000000
        })
        checkID()
    }

    await checkID()

    new users({
        id: userID,
        email,
        username: user,
        password: await encrypt(pass),
    }).save()

    return res.send({
        url: process.env.REDIRECT_SUCCESS
    })
})

app.post('/reset', (req, res) => {
    const reqBody = req.body.REQ_BODY
    
    if(!reqBody.email) return res.send({
        url: "?error=true"
    })

    users.findOne({
        email: reqBody.email,
    }, function(err, usr) {
        if(err) return res.send({
            url: "?error=true"
        })
        if(!usr) return res.send({
            url: "?error=true"
        })


    })
})

app.post('/reset/:id/:secret/:password', (req, res) => {
    const idParam = req.params.id
    const secret = req.params.secret
    const password = req.params.password

    reset.findOne({
        id: idParam,
        secret,
    }, async function(err, usr) {
        if(err) return res.send({
            url: "/notif?message=Error occured in database"
        })
        if(!usr) return res.send({
            url: "/notif?message=Reset link does not exist. Did it expire?"
        })

        if(password) {
            let encodePassword = await encrypt(password);

            users.findOneAndUpdate({
                id: idParam,
                password: encodePassword
            }, function(err, usr) {
                if(err) res.send({
                    url: "/notif?message=Error occured in database"
                })
                if(!usr) res.send({
                    url: "/notif?message=Error occured in database"
                })
            })

            return;
        }

        return res.send({
            message: 1,
            account: 1
        })
    })
})