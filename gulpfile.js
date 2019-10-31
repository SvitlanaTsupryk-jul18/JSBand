"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");

gulp.task("sass", function() {
  return gulp
    .src("./sass/**/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulp.dest("./css"));
});

gulp.task("autopref", () =>
  gulp
    .src("css/style.css")
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("./dist"))
);

// Static server
gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task("syncReload", function() {
  browserSync.reload();
});

gulp.task("scripts", function() {
  return gulp
    .src("script.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("default", ["browser-sync", "sass", "scripts"], function() {
  gulp.watch("./sass/**/*.scss", ["sass", "syncReload"]);
  gulp.watch("script.js", ["scripts", "syncReload"]);
});
