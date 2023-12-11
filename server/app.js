import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';
import allRoutes from './routes/allRoutes.js'; 
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';
import connectDB from './config/dbConn.js'; 

const PORT = process.env.PORT || 5000;

const app = express();

// Allow cors
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());

// Cookies
app.use(cookieParser());

// Routes
app.use('/api/v1', allRoutes);

// Errors
app.use(errorHandler);

async function start() {
  try {
    await connectDB(process.env.MONGO_DB_URL);

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (err) {
    console.log('The server could not start ' + err);
  }
}

start();
