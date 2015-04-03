var gulp = require('gulp');
var imageop = require('gulp-image-optimization');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlclean = require('gulp-htmlclean');

var cssPath = "css/*.css";
var cssDestPath = "public/css/";
var jsPath = "js/*.js";
var jsDestPath = "public/js/";

gulp.task('default', function() {	
  gulp.run("minify-css");
  gulp.run("compress");
  gulp.run("html");

});
 
gulp.task('images', function(cb) {
    gulp.src(['images/**/*.png','images/**/*.jpg','images/**/*.gif','images/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('public/images')).on('end', cb).on('error', cb);
});

gulp.task('minify-css', function() {
  return gulp.src(cssPath)
    .pipe(minifyCSS({keepBreaks:false,keepSpecialComments: 0}))
    .pipe(gulp.dest(cssDestPath))
});

gulp.task('compress', function() {
  gulp.src(jsPath)
    .pipe(uglify())
    .pipe(gulp.dest(jsDestPath))
});

gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(htmlclean({
        protect: /<\!--%fooTemplate\b.*?%-->/g,
        edit: function(html) { return html.replace(/\begg(s?)\b/ig, 'omelet$1'); }
      }))
    .pipe(gulp.dest('public/'));
});