var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// Importação do roteador 'router' dos livros (que é uma instância de 'express.Router', e que foi exportado no arquivo './routes/livros.js')
var livroRouter = require('./routes/livros');

// Importação do módulo CORS antes de instanciar o 'app'
var cors = require('cors');

var app = express();

// Após instanciar o app, utilização do método 'use' para ativar o CORS,
// mantendo sua configuração padrão, que aceita conexões de qualquer origem
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// Adição da rota base '/livros' utilizando o roteador 'livroRouter' importado anteriormente
app.use('/livros', livroRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
