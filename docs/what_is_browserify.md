BROWSERIFY is a tool for supporting modular Javascript that will run in a web browser, with NodeJS-style code conventions. 

Essentially, BROWSERIFY adds support for the Node-style `require` syntax for modules. Additionally, you can load some helpful `npm` modules directly.

As browsers do not yet support modular javascript, BROWSERIFY has to transform your sources. Its approach is to "bundle" all the source javascript files into one combined file in an order that preserves dependencies. 

Modern Javascript development relies on extended languages like React's JSX and Typescript. BROWSERIFY can support these through compatible transform plugins. Note if you are using GULP as your task runner, can do the transformations with GULP plugins instead of BROWSERIFY plugins. 

For debugging in the browser, BROWSERIFY can also produce "source maps", which help the browser's debugger report the line where the error occured. Source maps are necessary because BROWERIFY recompiles your individual modular javascript files into one giant one.

A typical BROWSERIFY workflow involves installing several plugins such as watchify, babelify, tsify, and uglify.

---

BROWSERIFY is popular with the Node-flavored javascript development community, as the NPM repository is increasingly for both front-end and back-end use. 

---
## Command Line Examples

browserify src/main.js -o dist/main.js
watchify src/main.js -o dist/main.js

browserify with transforms
install with npm babelify babel-preset-es2015 babel-preset-react
these babel presets become availble when designating a browersify transform

browserify -t [ babelify --presets [ es2015 react ] ] src/main.jsx -o dist/main.js

## API Examples

The API is used when calling browserify from within a task runner. 

browserify(opts)
.bundle()
.pipe(fs.createWriteStream('./dist/utils.js'));



