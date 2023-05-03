
* INT:

- conectar la 2da BD y probar
- intentar hacer pooling de sqlserver
- crear home para intrav1
- crear link para 
- Crear endpoint para opis
- Caso general trae el top 100 opis
- Permitir uso de datatables para filtros
- Permitir filtrar (contemplar los distintos casos de filtro)
- 

DONDE ME QUEDE:
- ya esta el nav
- arrancar por:
* router de get que traiga top 100 opis
* al ir al endpoint de opis
* hacer el layout
* preparar la logica que va en el router




COMANDOS

https://www.youtube.com/watch?v=qJ5R9WTW0_E&ab_channel=Fazt

- iniciar proyecto
npm init --yes

- modulos para este proyecto
npm i express express-handlebars express-session mysql express-mysql-session morgan bcryptjs passport passport-local timeago.js connect-flash express-validator

*express-mysql-session: gardar las sesiones de express en la BD
*express-handlebars: motor de plantillas
*connect-flash: mensajes entre vistas
*express-validator

- nodemon
npm i nodemon -D

- arranca a ejecutar express
- configu del package json npm run dev
- definimos index.js de las rutasy probamos un hello world
- importamos handlebars en la app
- cfg de handlebars en settings de la app
- creamos layouts en views y el main.hbs 
- configuramos habdlebars 3.0.0
- configuramos la carpeta partials y layouts
- extname para decirle que nombre tendran las extensiones de los archivos de hbs
- helpers --> procesar alguna fecha o algo habdlebars funciona asi; tenemos q hacerlo a traves de helpers. handlebars carpeta libs --> es la manera en la que funciona handlebars --> las funciones o cosas que queramos usar van a estar en ese archivos
- configuracion del motor hbs
- usarlo y listo
- url encoded --> para aceptar desde los formularios parametros que envien los usuarios; extenden false es para decirle que solo acepte data sencilla nada raro ni imagenes
- json, aceptamos json
- variables globales --> definimos un middleware
     lo que hace es tomar la info del user (req); toma lo que el servidor quiere responder (res); toma una funcion para continuar con el resto del codigo (next) --> esta funcion parece bastante inutil para la vamos a usar luego para meter ahi variables que queremos usar en cualquier parte
- creamos el archivo auth para las rutas de sig in sign out y todo lo relacionado con el login
- creamos links.js para todo lo relacionado a crud de links 
- vamos separando los conceptos
- vamos agregando nuestro index estas rutas
- le decimos a la app la ruta hacia el contenido estatico Public : codigo al que el navegador puede acceder --> aca va todo lo referido a JS CSS EL CLIENTE IMAGENES ETC


----

- creamos carpeta databse donde estaran las consultas hacia la base de datos
- crr --> sql n93 root
- corremos los scripts en nuestro caso en dbeaver; el vago usa el cmd de mysql nosotros le metemos dbeaver para ir mas rapido
- PROCEDEMOS CON LA CREACION DELL ARCH DE CONEXION CON LA BD
- creamos el archivo keys que tendra la configuracion de la BD
- invocamos al pooling de mysql en la seccion database --> tiene una especie de hilos que se van ejecutando y cada uno hace una tarea, en secuencia.
- creamos las demas consideraciones
- importante:
     el modulo no soporta promesas; entonces usamos promisify que convierte codigo de callbacks a codigo de promesas.
     * le aplico promisify al pool pero solo a la parte de querys que es la que voy a usar, a las cuales ahora le puedo aplicar promesas y async await
- ya tenemos para hacerle consultas a la BD
- traemos pool al archivo de links por ejemplo y ya estamos

---------------------- 

- crearemos los enlaces --> diseño de rutas y vistas
* creamos la carpeta links dentro de views, alli se almacenaran todas las vistas de links
     * creamos adentro el archivo a renderizar con extension hbs
     * en la respuesta cambiamos el send por render --> colocamos la ruta hacia add
     * configuramos el main con todas las partes comunes en el proyecto
     * SE VA TRAYENDO todo lo que va utilizando
     * se crea styles.css en una carpeta css dentro de public.
     * arranca creando add.hbs
* crea un formulario con bootstrap
* crea la barra de navegacion en partials --> en partials meto codigo saramba
* leer doc de handlebars pero aparentemente el signo de mayor indica q vamos a agregar algo de partials -->
* probamos el formulario con post route, tener en cuenta que en form en la parte de action poner las barras iguales /links/add no olvidarse barras invertidas
* probamos una insercion en la bd de algun links
* tuvimos que instalar mysql2 por algun error de auth

----
- VAMOS A TRABAJAR EN LA VISTA PARA EL USUARIO
     - renderizamos y le pasamos el resultado de la consulta como objeto parametro a render
     - lo recibe hbs y vamos
     - hacemos un poco de scriptng para hacer algunas cards y probar each metiendo los datos
     - llegamos a la parte de timestamp usamos timeago
     - las vistas de handlebars utilizaran el obj que exportemos desde el archivo handlebars en lib que se especifico en index js cuando engine el HBS 
     - definimos los helpers entonces para usar timeago
     - requiero format de timeago que es la unica func que vamos a usar
     - todo este lugar es para defiinir funciones que luego voy a usar en la vista
     - 
- realizamos el delete
- redirigimos a la misma pag cada vez que eliminamos
- probamos crear un boton para editar
     - debo redireccionar al saramba a una vista para que pueda editar
     - ajustar el edit.hbs y para que meustre tdo y que el formulario postee a edit
     - armar la ruta post de edicion
     - armar lo que hay que updatear + tener en cuenta el orden de la data
     - redirigir a links para ver lo editado
     - no olvidar rescatar el id a editar

----------------
- MENSAJES
     * usaremos connect flash para poder enviar mensajes a traves de distintas vistas
     * es un middleware
     * lo agregamos a index
     * lo usamos desde req, o sea desde middleware
     * vamos a usarlo al terminar alguna tarea
     * al agregar un link por ej
     * lo uso en el posteo de un link, para mostrarlo debo hacerlo disponible en las vistas
     * lo agregoen index en variables globales
     * lo uso en main hbs --> prestar atencion al codigo
     * requiere session --> flash tiene que almacernar en una sesion
     * hay que importarlo tmb
     * las sessiones alojan datos en la memoria del servidor y tmb en la BD, procedemos a configurar la session
          - movemos flash al inicio y config la session antes que flash
          - secret: como las guarda, ponemos texto sarambna
          - resafe para que no se renueve
          - uninitialized --> para q no se vuelva a establecer
          - store: dentro de la BD --> necesito el modulo express mysql session
     * una vez lo tenemos ya arrancan a funcionar los mensajes
     - tener en cuenta mysql 5 el password compatible
     * vamos a mensajear la edicion deleteacion tmb
     

---------------- jugamos con nav para dejarlo acorde

* cambiamos titulo
* ml-auto para ul de la nav y lo tiramos a derecha
* cambia el color a negro pero yo lo dejo como ta poque me guta asi
* agregamos un dropdown
* modificamos un poco de boludeces de navegacion

------- message.hbs creamos en partials

---- VAMOS CON LOS usuarios

* formularios de registro
* de logueo
* etc vamos a ver

---- arrancamos con el archivo auth

* creamos carpeta auth en vistas
* creamos hbs de auth con el form de logueo; creamos la ruta para ver el formulario y la ruta para enviar los datos por post
* creamos get y post para nuestro auth

- creamos el login form con bootstrap
* botones y datos etc

--- arrancamos con passport : passport y passportlocal laburan con express session -- en lib creamos passport.js donde definiremos los metodos de autenticacion

* nos traemos passport
* definimos la estrategia a usar (en este caso, con passport local porque vamos a autenticar localmente)
* podemos tener varias estrategias --> redes sociales etc

* definimos 2 variables, nos traemos passport 
* definimos una strategy, la variable es localstrategy porque asi figura en documentacion pero le puedo poner como quiera
* le decimos a passport que use una autenticacion, le pasamos el nombre que queremos que tenga "local.signup" en este caso., 2 do parametro es una instancia de la estrategia que definimos.
     - username es el nombre del campo que viene en el formulario "name=username"
     y asi con todos los que queramos recibir, fijarse en documentacion.
     - passreq to callback es para recibir el req 
     - le pasamos una funcion callback que es lo que va a realizar luego de autenticarse.
     - recibe req username password y DONE, donde DONE es lo que ejecutamos cuando vamos a ir a la siguiente tarea post autenticacion.
     - ponemos async porque seguramente haremos alguna tarea asincrona dentro.

* passport en la doc nos exige realizar un proceso de serializacion y deserializacion -_> es decir, guardarlo en una sesion y vice versa.
* dejamos comentado

* en index requerimos passport tmb
* inicializamos passport app.use(passport.init) ; pero passport no sabe como guardar los datos
* app.use(passport.session())
* en inicializaciones requerimos passport:
          // Inicializaciones
          const app = express()
          require('./lib/passport')

* para q la app se entere de la autenticacion que se esta creando
-- nos vamos para autentications js para usar passport en nuestras rutas
* 



-- 


---- 2:51
signing user

* 3:20

* 3 30 mostrar solo lo de un user; datos privados



