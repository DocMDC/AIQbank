require('dotenv').config()
const express = require('express');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const allRoutes = require('./routes/allRoutes')
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler')


const PORT = process.env.PORT || 5000

// Connect to MOngoDB
const connectDB = require('./config/dbConn')

// Allow cors
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json())
app.use(helmet());
app.use(express.json())

// Cookies
app.use(cookieParser());

// Routes
app.use('/api/v1', allRoutes)

// Errors
app.use(errorHandler)
async function start () {
    try {
        await connectDB(process.env.MONGO_DB_URL)
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}...`)
        })
    } catch (err) {
        console.log('the server could not start ' + err)
    }
}

start()