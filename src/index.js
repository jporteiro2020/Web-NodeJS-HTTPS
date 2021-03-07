const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const https = require('https');
const fs = require('fs');

//Inicializaciones
const app = express();

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(session({
    secret: 'laFraseMasSecreta',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Variables globales

//Rutas
app.use(require('./routes/index'));
app.use('/', require('./routes/enlaces'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Empezar servidor HTTP
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto: ' + app.get('port'));
});

//Empezar servidor HTTPS
/*https.createServer({
    cert: fs.readFileSync('mi_certificado.crt'),
    key: fs.readFileSync('mi_certificado.key')
  },app).listen(PUERTO, function(){
     console.log('Servidor https correindo en el puerto 443');
 });*/