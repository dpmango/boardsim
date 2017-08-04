"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var minify = require("gulp-csso");
var gulpif = require("gulp-if");
var gcmq = require('gulp-group-css-media-queries');




let postplugins = [
    autoprefixer({
        browsers: ["last 15 versions"]
    })
];

gulp.task("styles", function() {
    gulp.src("./source/sass/main.sass")
        .pipe(plumber())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(postcss(postplugins))
        .pipe(gcmq())
        .pipe(gulp.dest("./public/css/"))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("pages", function() {
    return gulp.src("./source/pages/*.pug")
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest("./public"))
        .pipe(browserSync.reload({ stream: true }));
});




gulp.task("browser-sync", function() {
    browserSync({
        server: {
            baseDir: "public"
        },
        open: true,
        notify: false
    })
});

gulp.task('mincss', function() {
    return gulp.src(paths.css)
        .pipe(minify())
        .pipe(gulp.dest('main'))
        .pipe(reload({ stream: true }));
});




gulp.task("watch", ["browser-sync"], function() {

    gulp.watch(["./source/sass/main.sass", "./source/**/*.sass", "./source/**/*.scss"], ["styles"]);
    gulp.watch("./source/**/*.pug", ["pages"]);

});

gulp.task("default", ["pages", "styles", "watch"]);