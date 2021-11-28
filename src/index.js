const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session =require('express-session');
const mysqlstore = require('express-mysql-session');
const passport = require('passport');
const{database} = require('./keys');

//inicializaciones
const app = express();
require('./lib/passport');

//configuraciones ddel servidor

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


//Middlewares
app.use(session({
    secret: 'gaaaaa',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//variable globales
app.use((req, res, next)=>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
})


//rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//POST '/links/';

//archivos publicos
app.use(express.static(path.join(__dirname, 'public')));

//inicialización del server
app.listen(app.get('port'), ()=>{
    console.log('Servidor en puerto', app.get('port'));
})

app.get('/ayuda', (req, res) => {
    res.render('ayuda');
});

app.get('/denunciar', (req, res) => {
    res.render('denunciar');
});