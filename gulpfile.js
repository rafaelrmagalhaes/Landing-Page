var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyHTML = require('gulp-minify-html');
var imageop = require('gulp-image-optimization');

gulp.task('default', function() {
	gulp.run('scripts');
	gulp.run('compress');
});


gulp.task('scripts', function() {
  return gulp.src('js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('compress', function() {
  return gulp.src('dist/all.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/opa'))
});

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src('./static/html/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist/'));
});
 
gulp.task('images', function(cb) {
    gulp.src(['src/**/*.png','src/**/*.jpg','src/**/*.gif','src/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('public/images')).on('end', cb).on('error', cb);
});