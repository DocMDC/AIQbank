import { Router } from 'express'; 
import { handleRegister } from '../controllers/registerController.js';
import { handleLogin } from '../controllers/loginController.js'; 
import { handleRefreshToken } from '../controllers/refreshTokenController.js'; 
import { handleLogout } from '../controllers/logoutController.js'; 
import { getAi } from '../controllers/getAiController.js'; 
import { handleForgotPassword } from '../controllers/forgotPasswordController.js'; 
import { handleResetPassword } from '../controllers/resetPasswordController.js'; 
import { handleEmbedding } from "../controllers/embeddingController.js"
import { handleQueryEmbedding } from "../controllers/embeddingController.js"
import { handleUploadFiles, handleUploadFile } from "../controllers/filesController.js"
import { handleAddQuestion } from "../controllers/addQuestionController.js"
import { handleGetQuestions } from "../controllers/getQuestionsController.js"
import { handleGetQuestionById } from "../controllers/getQuestionByIdController.js"
import { handleEditQuestion } from "../controllers/editQuestionController.js"
import { handleDeleteQuestion } from "../controllers/deleteQuestionController.js"
import { handleFilterQuestions } from "../controllers/filterQuestionsController.js"
import { handlePrepareQuestions } from "../controllers/prepareQuestionsController.js"
import multer from 'multer'

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './pdfs');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  },
});

// const upload = multer({ storage: fileStorageEngine });

const upload = multer({ dest: './uploads/' });

const router = Router(); 

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.get('/refresh', handleRefreshToken);
router.get('/logout', handleLogout);
router.post('/ai', getAi);
router.post('/forgot', handleForgotPassword);
router.patch('/reset', handleResetPassword);
router.post('/embedding', handleEmbedding)
router.post('/query-embedding', handleQueryEmbedding)
// router.get('/get-files', handleGetFiles)
router.post('/multiple', upload.array('pdfs'), handleUploadFiles)
router.post('single', upload.single('file'), handleUploadFile)
router.post('/add-question', handleAddQuestion)
router.get('/get-questions', handleGetQuestions)
router.get('/get-question/:id', handleGetQuestionById)
router.patch('/edit-question', handleEditQuestion)
router.delete('/delete-question/:id', handleDeleteQuestion)
router.get('/filter-questions', handleFilterQuestions)
router.patch('/prepare-questions', handlePrepareQuestions)

export default router; 
