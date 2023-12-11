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

export default router; 
