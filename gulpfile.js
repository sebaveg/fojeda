'use strict';

var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('gulp-cssnano'),
    postcss = require('gulp-postcss'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();


//Servidor de desarrollo
gulp.task('server', function(){
  browserSync.init({
    server:{
      baseDir: "./dist"
    }
  });
});

// Compila scss a css y pone los prefijos de todos los navegadores
gulp.task('sass', function(){
  return gulp.src('./dev/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});

//Agrega autoprefijos y minimiza el css. No es una tarea por defecto
gulp.task('postcss', function(){
  var processors = [
    autoprefixer({ browsers: ['last 2 versions', 'ie 8']})
  ];
  return gulp.src('dist/css/styles.css')
    .pipe(postcss(processors))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css/styles-min'));
})

//Compila pug a html. Para compilar html en una sola linia poner {pretty:false}
gulp.task('pug', function(){
  return gulp.src('./dev/pug/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./dist/'))
});

//Tarea para vigilar los cambios
gulp.task('watch', function(){
  gulp.watch('./dev/sass/**/*.scss', ['sass']);
  gulp.watch('./dev/pug/**/*.pug', ['pug']);
  gulp.watch("./dist/*.html").on('change', browserSync.reload);
});


gulp.task('default', ['watch','server']);
