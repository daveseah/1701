/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

	GULP is the task runner that reads files and transforms them, writing
	them back to a destination directory.

	BROWSERIFY is a tool for supporting modular Javascript that will run in a
	web browser, with NodeJS-style code conventions.

	TYPESCRIPT is a tool for static type checking of .ts files

	Adapted from:
	https://gist.github.com/Falconerd/3acc15f93b6a023e43b9
	https://www.typescriptlang.org/docs/handbook/gulp.html

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

// main features
var gulp        = require('gulp');
var browserify  = require('browserify');
var watchify    = require('watchify');
var babelify    = require('babelify');
var tsify       = require('tsify');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
// support for gulp tasks
var merge       = require('merge-stream');
var runseq      = require('run-sequence');
var gutil       = require('gulp-util');
// support for plugin data compatibility
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
// browser reload-on-save
var bsync       = require('browser-sync');

// source file control utilities
// (not currently used in skeleton)
var bower       = require('gulp-bower');
var changed     = require('gulp-changed');
var concat      = require('gulp-concat');
var del         = require('del');
var argv        = require('yargs').argv;
var path        = require('path');


/// FILE LOCATION CONSTANTS ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const SOURCE    = './src-browser/';
const DIST      = '../dist/';
const MODULES   = SOURCE+'modules/';
const CSS       = SOURCE+'css/';
const MEDIA     = SOURCE+'media/';
const HTML      = SOURCE+'html/';


/// BROWSERIFY-BASED BUILD ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	let browserifyOpts = Object.assign({}, watchify.args, {
		debug        : true,
		// 'entries' specifies the entry point for tsify too
		entries      : [ MODULES+'main.jsx' ],
		paths        : [ './node_modules', MODULES ],
		extensions   : [ '.jsx' ],
		cache        : {}
		,
		packageCache : {}
	});
	var babelOpts = {
		presets : ['es2015','react']
	};
	var cssOpts = {
		rootDir : SOURCE,
		autoInject : true,
		minify : true
	};

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	var watchifiedBundler = watchify(browserify( browserifyOpts ));
		watchifiedBundler.on('log',gutil.log);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	function bundle () {
		return watchifiedBundler
			.plugin(tsify)
			.transform('babelify', babelOpts) 
			.transform('browserify-css',cssOpts)
			.bundle()
			.on('error', function(err) {
				gutil.log(err.toString(),'\u0007\u0007\u0007');
				this.emit('end');
				process.exit(1);
			})
			.pipe(source('bundle.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps:true}))
			// uglify does not support ES6 features
			// .pipe(uglify())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(DIST));
	}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ This calls bundle() and does the bulk of the source compiling work
/*/ gulp.task('bundle', ['copy-index','copy-assets'], bundle);


/// ASSET COPYING /////////////////////////////////////////////////////////////
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


/// BROWSER REFRESH ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ This is called by the watcher created in 'watch', which tells browserSync
	to do its magic after rerunning the bundler
/*/ gulp.task('refresh', ['bundle'], bsync.reload);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ The watch task watches for changes and emits a message. However, the actual
	action is handled in by the 'refresh' task defined in the watcher itself!
/*/ gulp.task('watch', ['bundle'], function () {
		var watcher = gulp.watch( SOURCE+'**/*', ['refresh']);
		watcher.on('change', function(event) {
			let spath = path.relative(process.cwd()+'/'+SOURCE, event.path);
			gutil.log(`file "${spath}" has ${event.type}`);
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
/*/ This default task launches the entire chain
/*/	gulp.task('default', ['browser-sync']);

