#### PROJECT SUMMARY

Project 1701 is a refactored version of [Engine 1401A1](https://github.com/daveseah/1401A1), a HTML5/Javascript **video game framework + build environment** for exploring webapp development concepts / making web-based educational applications. 

#### QUICK START

Install **Git** and **Node** if you haven't already. You will be using a **terminal** window to issue all following instructions from the command line.

(1) If you haven't already installed **gulp-cli**, do so now:
```
  > npm install -g gulp-cli
```

(2) Clone the repository from **Github** into a folder where you will keep your development files. I use `~/Dev` on my Mac, but of course you can use anything you want:
```
  > cd /your/dev/folder
  > git clone https://github.com/daveseah/1701.git
```

This will create a folder called `1701` inside your dev folder that contains the project files.

(3) Install the **project's server-side dependencies**. This will be done by invoking `npm install` once; the dependencies are already specified in the `package.json` file, so this will be pretty painless:
```
  > cd 1701
  > cd build
  > npm install
```

(4) Now you're ready to **build and run** the project! Type the following: 
```
  > gulp
```

The `gulp` command loads `gulpfile.js` to find and execute a "runtask". The default runtask invokes **Bower** to download the **client-side dependencies** (as specified in `bower.json` file), copy the files it needs into a `public` directory, and then starts an **ExpressJS** web server.

You'll see the URL you need to browse to with a web browser to see the app run. I am using the **Chrome** browser for this project, though any mainstream HTML5-client desktop browser will probably work.

