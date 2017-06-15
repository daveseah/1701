
GULP implements a file transformation pipeline with a source of files that are
transformed by a series of plugins. The transformed files are then written to
a destination directory.

Each pipeline is called a TASK and is implemented using `gulp.task()`.  A task
is invoked from the command line using `gulp taskname`.

The source stream is created with `gulp.src( filepattern )`, which is directed
into each plugin using `pipe(pluginName())`. This can be chained indefinitely.
Use `pipe(gulp.dest( directory ))` to write the transformed files to disk.

GULP can also detect changes to a file and launch a pipeline with
`gulp.watch()`.

The `filepattern` used by `gulp.src( filepattern )` uses the  "node-glob"
syntax with some extensions.

The type of stream created by `gulp.src()` is a "NodeJS transform stream" in
object mode, which read/write "vinyl File objects". Gulp-compatible plugins
modules return an instance of a Transform object that processes File objects
to completion.

Vinyl represents files as a javascript File object with metadata. At minimum,
this is a `path` and `contents`. A plugin can add metadata or modify it, and
transform the contents of the file.

