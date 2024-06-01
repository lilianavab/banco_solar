import express from 'express';
import { postUsuarioHandler } from '../controller/bancoHandler.js'

const router = express.Router();

// '/' = /usuario
router.post('/', postUsuarioHandler ) //http://localhost:3000/usuario

export default router;

