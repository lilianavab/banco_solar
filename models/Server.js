// Importamos express
import express from 'express';
// Importamos nuestro moto de plantilla
import { create } from 'express-handlebars';

// Creación de variables de entorno
import { fileURLToPath } from 'url';
import { dirname } from "path";

// Variables que me permiten mostrar el path donde estoy en el proyecto
const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

//Habilitamos un Meddleware para Habilitar a express que reciba JSON

// IMPORTAMOS NUESTRAS VISTAS
 
//Home
import vistaHomeRoutes from '../routes/vistaHome.routes.js';

//Usuarios
import apiRootPostUsuarioRoutes from '../routes/apiRootPostUsuario.routes.js';
import apiRootGetUsuariosRoutes from '../routes/apiRootGetUsuarios.routes.js';
import apiRootPutEditarUsuarioRoutes from '../routes/apiRootPutEditarUsuario.routes.js';
import apiRootDeleteEliminarUsuarioRoutes from '../routes/apiRootDeleteEliminarUsuario.routes.js';

//transferencias
import apiRootPostTransferenciaRoutes from '../routes/apiRootPostTransferencia.routes.js';
import apiRootGetTransferenciasRoutes from '../routes/apiRootGetTransferencias.routes.js';

// Creamos nuestro modelo o clase de servidor

class Server {

    // Vamos a crear nuestro constructor para que ejecute 
    // Middleware
    // Rutas o Routes
    constructor(){
        // Creamos la app  de express
        this.app = express();
        this.port = process.env.PORT || 8000;

        //Home
        this.frontEndPaths = {
            rootHome:'/',
        }

        //Usuarios
        this.backEndApi = {
            // Usuarios
            rootAgregarUsuario:  '/usuario',
            rootObtenerUsuarios:  '/usuarios',
            rootEditarUsuario:   '/usuario', 
            rootEliminarUsuario: '/usuario',
            // Transferencias
            rootAgregarTransferencia:  '/transferencia',
            rootObtenerTransferencias:  '/transferencias',
        }
        // Iniciamos nuestros metodos iniciales
        this.middlewares();
        this.routes()
    }

    middlewares(){
         this.app.use( express.json() );
         this.app.use( express.static('public') );
         this.app.use('/css', express.static(`${__dirname}/../public/assets/css`));
         this.app.use('/img', express.static( `${__dirname}/../public/assets/img`));
         this.app.use('/js', express.static( `${__dirname}/../public/assets/js`));
         this.app.use('/jquery', express.static( `${__dirname}/../node_modules/bootstrap/dist/css`));
        
        this.app.use(express.urlencoded({ extended: true }));
        // Ruta de CSS para Bootstrap
        this.app.use('/bootstrap', express.static( `${__dirname}/../node_modules/bootstrap/dist/css`));
        this.app.use('/bootstrapjs', express.static( `${__dirname}/../node_modules/bootstrap/dist/js`));
        this.app.use('/bootstrapIcons', express.static( `${__dirname}/../node_modules/bootstrap-icons/font`));
        this.app.use('/jquery',express.static(  `${__dirname}/../node_modules/jquery/dist`  ));
    }
   
    routes(){
    // montar todo el Routing
    // Ruta para la vista principal (home)
     //Home
        this.app.use('/', vistaHomeRoutes )

       // Rutas CRUD para la API
       //Usuarios
    // POST (Crear un nuevo usuario)
        this.app.use(this.backEndApi.rootAgregarUsuario, apiRootPostUsuarioRoutes )
  
    // GET (Obtener datos de usuarios)    
        this.app.use(this.backEndApi.rootObtenerUsuarios, apiRootGetUsuariosRoutes )

    // PUT (Editar usuario existente)   
        this.app.use(this.backEndApi.rootEditarUsuario, apiRootPutEditarUsuarioRoutes )
    
    // DELETE (Eliminar usuario)    
        this.app.use(this.backEndApi.rootEliminarUsuario, apiRootDeleteEliminarUsuarioRoutes )
    
        //transferencias
    // POST (Crear una nueva transferencia)
        this.app.use(this.backEndApi.rootAgregarTransferencia, apiRootPostTransferenciaRoutes )
  
    // GET (Obtener datos de transferencias)    
      this.app.use(this.backEndApi.rootObtenerTransferencias, apiRootGetTransferenciasRoutes )
    }

    initHandelbars(){
        this.hbs = create({
            partialsDir:[
                "views"
            ]
        })

        this.app.engine( "handlebars", this.hbs.engine );
        this.app.set("view engine","handlebars");      
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        } )
    }
}

export default Server;