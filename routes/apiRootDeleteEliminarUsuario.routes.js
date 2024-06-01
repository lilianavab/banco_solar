import express from 'express';
import { deleteUsuarioHandler } from '../controller/bancoHandler.js'

const router = express.Router();

// '/' = /usuario/:id
router.delete('/:id', deleteUsuarioHandler ) //http://localhost:3000/usuario/:id

export default router;

