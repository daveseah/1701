// based on example from 
// https://gist.github.com/Falconerd/3acc15f93b6a023e43b9
// (with stuff stripped out)

// main build tools
var gulp        = require('gulp');
var browserify  = require('browserify');
var watchify    = require('watchify');
var babelify    = require('babelify');
// gulp support 
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var merge       = require('merge-stream');
var runseq      = require('run-sequence');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
// browser reload-on-save
var bsync       = require('browser-sync');
// source file control utilities
var bower       = require('gulp-bower');
var changed     = require('gulp-changed');
var concat      = require('gulp-concat');
var del         = require('del');
var argv        = require('yargs').argv;

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const SOURCE    = './src-browser/';
const DIST      = '../dist/';
const JS        = SOURCE+'js/';
const CSS       = SOURCE+'css/';
const MEDIA     = SOURCE+'media/';
const HTML      = SOURCE+'html/';

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var opts = Object.assign({}, watchify.args,{
    entries   : JS+'main.js', 
    paths     : [ JS ], 
    transform : [ ['babelify',{presets:['es2015']}] ],
    debug     : true
});
var bundler = watchify( browserify( opts ) );

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ The bundler function creates a single main.js file through
    browserify, accepting a stream of files
/*/ gulp.task('bundle', ['copy-index'], function () {
        return bundler.bundle()
            .on('error', function(err) {
                console.log(err.message);
                bsync.notify(err.message,3000);
                this.emit('end');
            })
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(sourcemaps.write('maps'))
            .pipe(gulp.dest(DIST+'js'))
    });
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Copies the main index.html file
/*/ gulp.task('copy-index', function () {
        gulp.src([
            HTML+'index.html'
        ])
        .pipe(changed(DIST))
        .pipe(gulp.dest(DIST));
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
/*/ This is called by the watcher created in 'watch', which tells browserSync
    to do its magic after rerunning the bundler
/*/ gulp.task('refresh', ['bundle','copy-assets','copy-index'], bsync.reload);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ The watch task watches for changes and emits a message. However, the actual
    action is handled in by the 'refresh' task defined in the watcher itself!
/*/ gulp.task('watch', ['bundle'], function () {
        var watcher = gulp.watch( SOURCE+'**/*', ['refresh']);
        watcher.on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
    });
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Launch browserSync server
/*/ gulp.task('browser-sync', ['watch'], function() {
        return bsync({ 
            server  : { baseDir: DIST },
            open    : false,
         });
    });
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    gulp.task('default', ['browser-sync']);

