require('dotenv').config()
const express = require('express')
const app = express();
const {sha256} = require('js-sha256')
const mongoose = require('mongoose')
const port = process.env.PORT || 9494

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

const encrypt = async (data) => sha256.hmac(process.env.SECRET, data);

app.use(express.urlencoded({extended: false}));
app.use(express.json())

app.listen(port, ()  => {
    console.log("Express listening on port " + port);
})

app.get('/users', async (req, res, next) => {
    const userList = await JSON.parse(JSON.stringify(await users.find()));

    for(let i = 0; i < userList.length;i++) {
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