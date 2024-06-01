import express from 'express';
import { getTransferenciasHandler } from '../controller/bancoHandler.js'

const router = express.Router();

// '/' = /transferencias
router.get('/', getTransferenciasHandler ) //http://localhost:3000/transferencias

export default router;

