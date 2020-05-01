const express = require('express');
//CORS
const cors = require('cors');

//KNEX FOR DATABASE CONNECTION
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
})

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

//CONTROLLERS
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')



//BCRYPT
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

app.get('/', (req, res)=> {res.send('It is working')})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)});
app.post('/signin', (req,res) => {signin.handleSignIn(req,res,db,bcrypt)});
app.get(`/profile/:id`, (req, res) => {profile.handleProfile(req,res,db)});
app.put('/image', (req, res) => {image.handleImage(req,res, db)});
app.post('/imageurl', (req, res) => {image.handleAPI(req,res)});

app.listen(process.env.PORT || 3000, () =>{
    console.log(`App is running on ${process.env.PORT}`)}
)