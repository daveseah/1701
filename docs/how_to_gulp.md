## WHAT DOES GULP DO

GULP is used to create "tasks" that read a bunch of files, transform them in some way, and then write them back out. 

GULP can define multiple such tasks and their dependencies, allowing you to create complex workflows that can be invoked at the command line. 

The cool thing about GULP is that it is not a configuration file, but an actual NodeJS program. That means you have access to the entire Node infrastructure and packages. 

The GULP API is just four commands, so the transformations are provided by "plugin modules". There are many pre-written ones available so you probably don't need to write your own for popular development workflows. 

The challenge in using GULP is finding which plugins to use. There are multiple ways to implement the same workflow using different sets of plugins. Some plugins are written specifically to work with GULP and use GULP's internal model. Other popular plugins use their own semantics and must have their data streams converted to work with GULP.

## GENERAL APPROACH

GULP tasks typically use `gulp.src( globpattern )` to create a Vinyl File object stream that is "piped" into various plugins that know how to transform them. The final transformed files are written to disk with `pipe(gulp.dest( directorypath ))`. 

GULP tasks don't have to use `gulp.src()` to start the pipeline. BROWSERIFY, for example, implements its own pipeline to read a bunch of files and produces a single combined file. It has its own API and semantics regarding streams. Combining GULP with BROWSERIFY and other useful transforms requires the use of translators; this is the tricky part. Also, the order of transforms is critical, and you have to understand what each transform does in the context of delivering a deployable HTML application for the web. 

There are also different ways to pass initialization parameters to each kind of plugin / transform. Figuring when and where to insert these parameters is not always obvious. 

It is helpful to remember that you are writing a program to define and run workflows, so all of your programming knowledge can be brought to bear on the problem. 

## DESIRED WORKFLOW

I want to implement the following:

* Browserify for modular javascript
* React support via Babelizer
* Typescript support
* Minimized source
* Source Maps
* Watched Recompile
* bower support


