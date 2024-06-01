import express from 'express';
import { getUsuariosHandler  } from '../controller/bancoHandler.js'

const router = express.Router();

// '/' = /usuarios
router.get('/', getUsuariosHandler  ) //http://localhost:3000/usuarios

export default router;

