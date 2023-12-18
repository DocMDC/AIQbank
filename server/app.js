import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';
import allRoutes from './routes/allRoutes.js'; 
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';
import connectDB from './config/dbConn.js'; 
import verifyJWT from './middleware/verifyJWT.js';
import { handleFilterQuestions } from "./controllers/filterQuestionsController.js"
import { handlePrepareExam } from "./controllers/prepareExamController.js"
import { handleGetExams } from "./controllers/getExamsController.js"
import { handleResetAccount } from "./controllers/resetAccountController.js"
import { handleGetExam } from "./controllers/getExamController.js"
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

//May need to implement refresh token / fix auth here before routes

// Routes
app.use('/api/v1', allRoutes);

//Routes requiring user identification
app.use('/api/v1/filter-questions', verifyJWT, handleFilterQuestions)
app.use('/api/v1/prepare-questions', verifyJWT, handlePrepareExam)
app.use('/api/v1/get-exams', verifyJWT, handleGetExams)
app.use('/api/v1/reset-account', verifyJWT, handleResetAccount)
app.use('/api/v1/get-exam/:id', verifyJWT, handleGetExam)

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
