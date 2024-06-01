import Server from "./models/Server.js"

import dotenv from 'dotenv';

// Esto es para que funcione la ruta haca el .env
dotenv.config();

// Instanciar el Server 
const server = new Server(); 
server.initHandelbars(); 
server.listen(); 

