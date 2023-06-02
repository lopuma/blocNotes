const express   = require('express'                 );
const exphbs    = require('express-handlebars'      );
const morgan    = require('morgan'                  );
const path      = require('path'                    );
const config    = require('./config'                );
const index     = require('./routes/index.router'   );
const favicon   = require('serve-favicon'           );

// Configuraciones
const PORT = config.PORT;

// Creación de la aplicación Express
const app = express();

// Ruta favicon.ico
const faviconPath = path.join(__dirname, '/public/img/favicon.ico');

// Configuración del motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}));

// Middlewares
app.use(favicon(faviconPath));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.use('/', index);

// Recursos Públicos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'js')));
app.use('/style', express.static(path.join(__dirname, 'public', 'css')));
app.use('/image', express.static(path.join(__dirname, 'public', 'img')));
app.use('/scripts', express.static(path.join(__dirname, 'js')));

// Manejo de error 404
app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Course Notes"
    });
});

// Inicio del servidor
app.listen(PORT, () => {
    console.info(`The Server is connected on the PORT: ${PORT}`, `http://0.0.0.0:${PORT}`);
});