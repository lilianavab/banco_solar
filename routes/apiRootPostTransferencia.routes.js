import express from 'express';
import { postTransferenciaHandler } from '../controller/bancoHandler.js'

const router = express.Router();

// '/' = /transferencia
router.post('/', postTransferenciaHandler ) //http://localhost:3000/transferencia

export default router;

