import express from 'express';
import { putUsuarioHandler } from '../controller/bancoHandler.js'

const router = express.Router();

// '/' = /usuario/:id
router.put('/', putUsuarioHandler) //http://localhost:3000/usuario/:id

export default router;

