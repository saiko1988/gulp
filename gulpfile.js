const { src, dest, watch, series, parallel } = require( 'gulp' );
// scss
const Fiber = require( 'fibers' );
const sass = require( 'gulp-sass' );
const autoprefixer = require( 'autoprefixer' );
const cssDeclarationSorter = require( 'css-declaration-sorter' );
const postcss = require( 'gulp-postcss' );

sass.compiler = require( 'sass' ); // Dart Sassの使用を明示的に宣言する
// ejs
const fs = require( 'fs' );
const ejs = require( 'gulp-ejs' );
const rename = require( 'gulp-rename' );

// filePath
const files = {
  html: {
    src: './src/ejs/**/*.ejs',
    dist: './assets/html',
  },
  styles: {
    src: './src/scss/**/*.scss',
    dist: './assets/css',
  }
};

const compileEjs = () => {
  return src( [ files.html.src, '!./src/ejs/**/_*.ejs' ] )
    .pipe( ejs(
      {}, { root: './' }
    ) )
    .pipe( rename( { extname: '.html' } ) )
    .pipe( dest( files.html.dist ) );
}

const compileSass = () => {
  return src( files.styles.src, { sourcemaps: true } )
    .pipe( sass(
      {
        fiber: Fiber,
        outputStyle: 'expanded',
      }
    ) )
    .pipe( postcss( [
      cssDeclarationSorter( {
        order: 'smacss',
      } ),
      autoprefixer( {
        grid: 'autoplace',
      } ),
    ] )
    )
    .pipe( dest( files.styles.dist, { sourcemaps: './' } ) );
}

const watchFiles = () => {
  watch( files.html.src, compileEjs );
  watch( files.styles.src, compileSass );
}

exports.default = watchFiles;