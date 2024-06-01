import pool from '../config/db.js'
import moment from 'moment';


export const nuevoUsuario = async (usuarios) => {
    let client
    const values = Object.values(usuarios)
    const consulta = {
    name: "insert-data",
    text: "INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) returning *",
    values
}
try {
    client = await pool.connect();
    const response = await client.query(consulta);
    return response

} catch (error) {
    return console.error('Error durante la conexión o la consulta:', error.stack);

}finally{
    if(client){
    client.release();
    }
}     
} 

export const obtenerUsuarios = async () => {
    let client
    const consulta = {
    name: "fetch-data",
    text: "SELECT * FROM usuarios ORDER BY id ASC",
}
try {
    client = await pool.connect();
    const response = await client.query(consulta);
    return response

} catch (error) {
    return console.error('Error durante la conexión o la consulta:', error.stack);

}finally{
    if(client){
    client.release();
    }
} 
}

export const editarUsuario = async(usuario) => {
    let client
    const values = Object.values(usuario)
    const consulta = {
        name: "update-usuario",
        text: "UPDATE usuarios SET nombre=$2, balance=$3 WHERE id=$1 RETURNING *",
        values
    }
try {
    client = await pool.connect();
    const response = await client.query(consulta)
    return response.rows

} catch (error) {
    return console.error('Error durante la conexión o la consulta:', error.stack);

}finally{
    if(client){
    client.release();
}
}  
}

export const eliminarUsuario = async (id) => {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        await client.query('DELETE FROM transferencias WHERE emisor = $1 OR receptor = $1', [id]);

        await client.query('DELETE FROM usuarios WHERE id = $1', [id]);

        await client.query('COMMIT');

        return { message: 'Usuario eliminado correctamente' };

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error durante la conexión o la consulta:', error.stack);
        throw error;

    } finally {
        if (client) {
            client.release();
        }
    }
}

export const nuevaTransferencia = async (transferencia) => {
    let client;
    const { emisor, receptor, monto } = transferencia;
    const fecha = moment().format('DD/MM/YYYY HH:mm');

    try {
        client = await pool.connect();
        await client.query('BEGIN');

        await client.query('UPDATE usuarios SET balance = balance - $1 WHERE id = $2', [monto, emisor]);

        await client.query('UPDATE usuarios SET balance = balance + $1 WHERE id = $2', [monto, receptor]);

        const result = await client.query('INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, $4) RETURNING *', [emisor, receptor, monto, fecha]);

        await client.query('COMMIT');
        return result;

    } catch (error) {
        if (client) {
            await client.query('ROLLBACK');
        }
        console.error('Error durante la conexión o la consulta:', error.stack);
        throw error;

    } finally {
        if (client) {
            client.release();
        }
    }
};

export const obtenerTransferencias = async () => {
    let client;
    const consulta = {
        name: "fetch-data-nueva",
        text: "SELECT (SELECT nombre FROM usuarios WHERE id = t.emisor) AS emisor, (SELECT nombre FROM usuarios WHERE id = t.receptor) AS receptor, t.monto, t.fecha FROM transferencias t;"
    };
    try {
        client = await pool.connect();
        const response = await client.query(consulta);
        return response;

    } catch (error) {
        console.error('Error durante la conexión o la consulta:', error.stack);
        throw error; 
        
    } finally {
        if (client) {
            client.release();
        }
    }
}


