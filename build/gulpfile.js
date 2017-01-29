// based on example from 
// https://gist.github.com/alkrauss48/a3581391f120ec1c3e03
// (with stuff stripped out)

var gulp        = require('gulp');
var browserify  = require('browserify');
var watchify    = require('watchify');
var babelify    = require('babelify');
//
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
//
var bs          = require('browser-sync');
var bs_server   = bs.create();
var bs_reload   = bs.reload;
//
var bower       = require('gulp-bower');
var changed     = require('gulp-changed');
var concat      = require('gulp-concat');
var del         = require('del');
var merge       = require('merge-stream');
var runseq      = require('run-sequence');
var argv        = require('yargs').argv;

const SOURCE    = './src-browser/';
const DIST      = '../dist/';
const JS        = SOURCE+'js/';
const CSS       = SOURCE+'css/';
const MEDIA     = SOURCE+'media/';
const HTML      = SOURCE+'html/';

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    gulp.task('browserify', function () {
        return browserify({
            entries: JS+'main.js', 
            paths: [
                JS
            ],
            debug: true,
        })
            .transform("babelify", { presets: ["es2015"] })
            .bundle()
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(sourcemaps.write('maps'))
            .pipe(gulp.dest(DIST+'js'))
    });

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    gulp.task('watch', function () {
        console.log('watching');
        gulp.watch(SOURCE, ['build','bs-reload']);
    });

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Copy non-framework modules and assets, ignoring Markdown files.
    This includes vendor-extra, which contains non-bower managed libs.
/*/ gulp.task('copy-assets', function () {
        return merge (
            // copy modules directory, skipping framework
            // copy images directory as-is
            gulp.src([
                    MEDIA+'**/!(*.md)'
                ])
                .pipe(changed(DIST))
                .pipe(gulp.dest(DIST+'media')),

            // copy stylesheets as-is
            gulp.src([
                    CSS+'**/!(*.md)'
                ])
                .pipe(changed(DIST))
                .pipe(gulp.dest(DIST+'css'))
        );
    });
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    gulp.task('copy-html', function () {
        gulp.src([
            HTML+'**/!(*.md)'
        ])
        .pipe(changed(DIST))
        .pipe(gulp.dest(DIST));
    });
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    gulp.task('browser-sync', function () {
        bs_server.init({
            open: false,
            server: {
                baseDir: DIST
            }
        });
    });
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    gulp.task('bs-reload', function () {
        bs.reload();
    });

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    gulp.task('build', [ 'browserify', 'copy-html', 'copy-assets' ]);
    gulp.task('default', ['build', 'watch', 'browser-sync']);
