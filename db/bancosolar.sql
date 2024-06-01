--Conectar al psql con el usuario 
psql -U postgres

-- Se crea la base de datos llamada "bancosolar"
CREATE DATABASE bancosolar;

--Conectarse a la nueva base de dato
\c bancosolar

-- CREACION de la Tabla usuarios
CREATE TABLE usuarios (
   id SERIAL PRIMARY KEY, 
   nombre VARCHAR(50), 
   balance FLOAT CHECK (balance >= 0));

-- CREACION de la Tabla transferencia
CREATE TABLE transferencias (
   id SERIAL PRIMARY KEY, 
   emisor INT, 
   receptor INT, 
   monto FLOAT, 
   fecha TIMESTAMP, 
   FOREIGN KEY (emisor) REFERENCES usuarios(id), 
   FOREIGN KEY (receptor) REFERENCES usuarios(id));

-- CONSULTAS DE LA TABLA
SELECT * FROM usuarios;
SELECT * FROM transferencias;

Datos para cargar en la tabla Usuarios

Id Nombre                  Balance

1  Pedro Rivas              20000
2  Luis Vallejo             40000
3  Alessandra Martinez      60000
4  Jhoanna Gonzalez         80000
5  Cesar Aguilar            10000
6  Josue Acosta             30000
7  Sahily Espinoza          50000
8  Aurora Fernandez         70000
9  Gael Ruiz                90000
10 Cristian Pereda         100000
11 Ana Alvarez             120000 
12 Josefa Cruz             140000
13 Diego Arias             160000
14 Raul Blanco             180000   
15 Zoraida Marval          200000
16 Sofia Camacaro          110000
17 Jose Rodriguez          130000 
18 Fernando Giron          150000   
19 Rebeca Morales          170000
20 Oriana Uribe            190000   

Datos para cargar en la tabla Transferencias

Id Emisor               Receptor              Monto

1  Pedro Rivas           Alessandra Martinez   10000
2  Luis Vallejo          Jhoanna Gonzalez      30000
3  Alessandra Martinez   Pedro Rivas           50000
4  Jhoanna Gonzalez      Luis Vallejo          70000
5  Cesar Aguilar         Sahily Espinoza        5000
6  Josue Acosta          Aurora Fernandez      20000
7  Sahily Espinoza       Cesar Aguilar         25000
8  Aurora Fernandez      Josue Acosta          30000
9  Gael Ruiz             Ana Alvarez           20000
10 Cristian Pereda       Josefa Cruz           30000
11 Ana Alvarez           Gael Ruiz             40000 
12 Josefa Cruz           Cristian Pereda       20000
13 Diego Arias           Zoraida Marval        10000
14 Raul Blanco           Sofia Camacaro        40000   
15 Zoraida Marval        Diego Arias           20000
16 Sofia Camacaro        Raul Blanco           50000
17 Jose Rodriguez        Rebeca Morales        30000 
18 Fernando Giron        Oriana Uribe          50000   
19 Rebeca Morales        Jose Rodriguez        70000
20 Oriana Uribe          Fernando Giron        45000


21  Pedro Rivas           Alessandra Martinez   200000