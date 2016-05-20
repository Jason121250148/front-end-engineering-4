const babel = require("gulp-babel");
const concat = require("gulp-concat");
const gulp = require("gulp");
const hash = require("gulp-hash");
const less = require("gulp-less");
const uglify = require("gulp-uglify");
const uglifycss = require("gulp-uglifycss");
const rimraf = require("gulp-rimraf");
const runSequence = require("run-sequence");
const revReplace = require("gulp-rev-replace");

const SRC_PATH = "./src";
const DEST_PATH = "./public";
const ASSETS_PATH = `${DEST_PATH}/assets`;

gulp.task("default", ["build"]);

gulp.task("build", ["clean"], (cb) => {
    runSequence(
        "build-vendor",
        "build-js",
        "build-less",
        "build-html",
        cb
    );
});

gulp.task("clean", () => {
    return gulp.src(DEST_PATH)
        .pipe(rimraf());
});

gulp.task("build-vendor", () => {
    return gulp.src([
        "./node_modules/jquery/dist/jquery.js",
        "./node_modules/jquery.transit/jquery.transit.js"
    ])
        .pipe(concat("vendor.js"))
        .pipe(uglify())
        .pipe(hash())
        .pipe(gulp.dest(ASSETS_PATH))
        .pipe(hash.manifest("manifest.json",true))
        .pipe(gulp.dest(ASSETS_PATH));
});

gulp.task("build-js", () => {
    return gulp.src(`${SRC_PATH}/**/*.js`)
            .pipe(babel({
                "sourceRoot": SRC_PATH,
                "presets": ["es2015"]
            }))
            .pipe(uglify())
            .pipe(hash())
            .pipe(gulp.dest(ASSETS_PATH))
            .pipe(hash.manifest("manifest.json", true))
            .pipe(gulp.dest(ASSETS_PATH));
});

gulp.task("build-less", () => {
    return gulp.src(`${SRC_PATH}/**/index.less`)
            .pipe(less())
            .pipe(uglifycss())
            .pipe(hash())
            .pipe(gulp.dest(ASSETS_PATH))
            .pipe(hash.manifest("manifest.json", true))
            .pipe(gulp.dest(ASSETS_PATH));
});

gulp.task("build-html", () => {
    const manifest = gulp.src(`${ASSETS_PATH}/manifest.json`);
    return gulp.src(`${SRC_PATH}/index.html`)
            .pipe(revReplace({
                manifest
            }))
            .pipe(gulp.dest(DEST_PATH));
});
