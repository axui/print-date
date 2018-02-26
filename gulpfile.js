'use strict';

// 필요한 모듈선언
const gulp = require( 'gulp' );
const shell = require( 'gulp-shell' );

const ts = require( "gulp-typescript" );
const tsProject = ts.createProject( 'tsconfig.json' );

// 전역 오브젝트 모음
const fnObj = {
  paths: {
    src: 'src/',
    dist: 'dist/'
  }
};


// 걸프 기본 타스크
gulp.task( 'default', function () {
  return true;
} );


// task for ES5
gulp.task( 'dist-ES', function () {
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

gulp.task( 'dev run!', shell.task( [
  'webpack-dev-server --hotOnly'
] ) );

gulp.task( 'deploy to docs', shell.task( [
  'webpack -p --env=production --progress --profile --colors && git add -A'
] ) );