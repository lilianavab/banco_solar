import pkg from 'pg';
const { Pool } = pkg;

import dotenv from 'dotenv';
import moment from 'moment';
dotenv.config();

const config = { 
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE, 
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

const pool = new Pool(config);

export default pool;