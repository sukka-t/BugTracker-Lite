require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require("express");
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const pg = require("pg");
const jwt = require("jsonwebtoken");

//Port Setting
const app = express();
const port = process.env.PORT || 7000

//Setting EJS
app.set('views', path.join(__dirname, '..', 'Frontend'));
app.set('view engine', 'ejs'); //View Engine


// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'Frontend')));

//Test Routes
app.get('/test', (req,res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'test'));
})
app.get('/', (req,res) => {
  res.render('test.ejs');
})

//Routes
app.get('/home', (req,res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'index.html'));
})
app.get('/register', (req,res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'registerPage.html'));
})
app.get('/login', (req,res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'signInPage.html'));
})
app.get('/user', (req,res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'userPage.html'));
})


//DB connection
const pool = new pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_POST,
    database: process.env.DB_NAME
});
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.send(`Postgres time: ${result.rows[0].now}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});

//Display messages
app.listen(port, () => {
    console.log(`Server Launched!`);
    console.log(`Server running on port ${port}`);
});
pool.connect()
  .then(client => {
    console.log('✅ Connected to the database');
    client.release();
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.stack);
  });


