#### PROJECT SUMMARY

1701 is a refactored version of [Engine 1401A1](https://github.com/daveseah/1401A1), which is my ongoing effort to make a nice HTML5/Javascript environment for playing with web-based game development. 

#### QUICK START

Install **Git** and **Node** if you haven't already. I'm also using **Yarn**, which is an alternative to Node's **npm** package manager. 

(1) Install yarn through npm. Also install **gulp-cli**, which is 
```
  > npm install -g yarn
```

(2) If you haven't already installed **gulp-cli**, do so now:
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
  > yarn
```

(4) Now you're ready to **build and run** the project! Type the following: 
```
  > gulp
```

The `gulp` command loads `gulpfile.js` to find and execute a "runtask". The default runtask invokes **Bower** to download the **client-side dependencies** (as specified in `bower.json` file), copy the files it needs into a `public` directory, and then starts an **ExpressJS** web server.

You'll see the URL you need to browse to with a web browser to see the app run. I am using the **Chrome** browser for this project, though any mainstream HTML5-client desktop browser will probably work.

