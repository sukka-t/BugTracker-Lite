require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const pg = require("pg");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


const app = express();
const port = process.env.PORT || 7000

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


