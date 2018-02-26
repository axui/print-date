'use strict';

// 필요한 모듈선언
const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );
const shell = require( 'gulp-shell' );
const plumber = require( 'gulp-plumber' );
const notify = require( "gulp-notify" );

const ts = require( "gulp-typescript" );
const tsProject = ts.createProject('tsconfig.json');

function errorAlert( error ) {
  notify.onError( { title: "Gulp Error", message: "Check your terminal", sound: "Purr" } )( error ); //Error Notification
  console.log( error.toString() );//Prints Error to Console
  this.emit( "end" ); //End function
}

// 전역 오브젝트 모음
const fnObj = {
  paths: {
    src: 'src/',
    dist: 'dist/'
  }
};


// 걸프 기본 타스크
gulp.task( 'default', [ 'scss-watch' ], function () {
  return true;
} );


// task for ES5
gulp.task( 'dist-ES', [ 'dist-scss' ], function () {
  return gulp.src( [ fnObj.paths.src + '/**/*.ts', fnObj.paths.src + '/**/*.tsx' ] )
    .pipe( tsProject() )
    .pipe( gulp.dest( fnObj.paths.dist ) );
} );

/**
 * npm publish
 */
gulp.task( 'ES npm publish patch', [ 'dist-ES' ], shell.task( [
  'cd dist && npm version patch -m "version patch" && npm publish'
] ) );

gulp.task( 'dev run!', [  ], shell.task( [
  'webpack-dev-server --hotOnly'
] ) );

gulp.task( 'deploy to docs', shell.task( [
  'webpack -p --env=production --progress --profile --colors && git add -A'
] ) );