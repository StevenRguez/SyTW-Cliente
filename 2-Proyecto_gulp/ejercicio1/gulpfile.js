// gulpfile.mjs
import gulp from 'gulp';
const { src, dest, watch, series, parallel } = gulp;

import * as dartSass from 'sass';           
import gulpSass from 'gulp-sass';
const sassCompiler = gulpSass(dartSass);

import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
// arriba del archivo:
import newer from 'gulp-newer';
import gulpIf from 'gulp-if';
import pngquant from 'imagemin-pngquant';
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminSvgo from 'imagemin-svgo';
import browserSync from 'browser-sync';
const bs = browserSync.create();

// helpers por extensión
const isJpeg = (file) => /\.(jpe?g)$/i.test(file.extname);
const isPng  = (file) => /\.png$/i.test(file.extname);
const isSvg  = (file) => /\.svg$/i.test(file.extname);

// Permite desactivar optimización con NO_IMG_OPT=1
const IMG_OPT_ENABLED = process.env.NO_IMG_OPT !== '1';


// === Rutas ===
const paths = {
  scssEntries: ['scss/*.scss', '!scss/_*.scss'], // <— entries
  scssAll: 'scss/**/*.scss',
  cssOut: 'css',
  cssAll: ['css/**/*.css', '!css/**/*.min.css'],
  jsAll: ['js/**/*.js', '!js/**/*.min.js'],
  imgAll: 'img/**/*.{png,jpg,jpeg,svg,gif,webp}',
  html: 'index.html'
};

// === Tareas ===

// Sass → CSS con sourcemaps
function sassTask() {
  return src(paths.scssEntries, { sourcemaps: true, allowEmpty: true })
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(dest(paths.cssOut, { sourcemaps: '.' }))
    .pipe(bs.stream());
}

// Minificar CSS → *.min.css
function minifyCssTask() {
  return src(paths.cssAll, { allowEmpty: true })
    .pipe(cleanCSS({ level: 2 }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.cssOut))
    .pipe(bs.stream());
}

// Minificar JS → *.min.js
function jsTask() {
  return src(paths.jsAll, { allowEmpty: true })
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('js'))
    .pipe(bs.stream());
}

// Optimizar imágenes (in-place, por tipo)
function imagesTask() {
  return src(paths.imgAll, { allowEmpty: true })
    .pipe(newer('img')) // solo las nuevas/modificadas
    .pipe(gulpIf(!IMG_OPT_ENABLED, dest('img'))) // si está desactivado, solo copia
    .pipe(gulpIf(
      IMG_OPT_ENABLED,
      gulpIf(isJpeg, imagemin([imageminMozjpeg({ quality: 80, progressive: true })], { verbose: true }))
    ))
    .pipe(gulpIf(
      IMG_OPT_ENABLED,
      gulpIf(isPng, imagemin([pngquant({ quality: [0.7, 0.85] })], { verbose: true }))
    ))
    .pipe(gulpIf(
      IMG_OPT_ENABLED,
      gulpIf(isSvg, imagemin([
        imageminSvgo({
          plugins: [
            'preset-default',
            { name: 'removeViewBox', active: false }
          ]
        })
      ], { verbose: true }))
    ))
    .pipe(dest('img'))
    .pipe(bs.stream());
}

// Servidor + watch
function watchTask() {
  bs.init({ server: { baseDir: '.' }, open: true, notify: false });
  watch(paths.scssAll, series(sassTask, minifyCssTask));
  watch(paths.jsAll, jsTask);
  watch(paths.imgAll, imagesTask);
  watch(paths.html).on('change', bs.reload);
}

// Registrar tareas (manteniendo tus nombres)
gulp.task('sass', sassTask);
gulp.task('minify-css', minifyCssTask);
gulp.task('images', imagesTask);
gulp.task('js', jsTask);
gulp.task('watch', watchTask);
gulp.task('default', series(parallel(sassTask, minifyCssTask, jsTask, imagesTask), watchTask));