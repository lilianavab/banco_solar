import {
    nuevoUsuario,
    obtenerUsuarios,
    editarUsuario,
    eliminarUsuario,
    nuevaTransferencia,  
    obtenerTransferencias
} from '../models/consultas.js'

export const postUsuarioHandler = async (req, res) => {    
    try {
        const response = await nuevoUsuario(req.body);
        console.log('Salida de response-->', response);
        res.status(200).json({ respuesta: 'OKEY', data: response.rows});
    } catch (error) {
        console.error('Error al insertar los datos', error);
    }
};

export const getUsuariosHandler = async (req, res) => { 
   try {
    const response = await obtenerUsuarios();
    res.status(200).json(response.rows)
   } catch (error) {
    console.error('Error al realizar la consulta de usuarios', error)
   }
};

export const putUsuarioHandler = async (req, res) => { 
    try {
        const  { id }  = req.query
        const { nombre, balance } = req.body
     
        const response = await editarUsuario({id, nombre, balance  })
     res.status(200).send( response.rows )
       
    } catch (error) {
        console.error('Error al realizar la consulta de usuarios', error)
    }
}

export const deleteUsuarioHandler = async (req, res) => { 
    try {
        const { id } = req.params;
        const response = await eliminarUsuario(id);
        res.status(200).send(response);
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
}
export const postTransferenciaHandler = async (req, res) => {
    try {
        const { emisor, receptor, monto } = req.body;
        const response = await nuevaTransferencia({ emisor, receptor, monto });
        console.log('Salida de response-->', response);
        res.status(201).json({ respuesta: 'Transferencia realizada con éxito', data: response.rows });
    } catch (error) {
        if (error.message === 'El saldo del emisor es insuficiente para realizar la transferencia') {
            res.status(400).json({ error: error.message });
        } else {
            console.error('Error al realizar la transferencia', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}; 

export const getTransferenciasHandler = async (req, res) => { 
   try {
    const response = await obtenerTransferencias();
    res.status(200).json(response.rows)
   } catch (error) {
    console.error('Error al realizar la consulta de transferencias', error)
   }
};
