var gulp = require('gulp');
var imageop = require('gulp-image-optimization');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlclean = require('gulp-htmlclean');
var concat = require('gulp-concat');

gulp.task('default', function() {	
  gulp.run("concat");
  gulp.run("uglify");
  gulp.run("html");
  gulp.run("concat-css");
  gulp.run("css");
});

//Junta todos os plugins em um js só e minifica ele
gulp.task('concat', function() {
  return gulp.src(['js/html5lightbox.js', 'js/mask.js', 'js/pace.js', 'js/preloading.js', 'js/wow.js'])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'));
});

//Minifica JS
gulp.task('uglify', function() {
  gulp.src(['js/bootstrap.js', 'js/jquery.js', 'js/main.js', 'js/owl.carousel.js'])
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
});

//Minifica HTML
gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(htmlclean({
        protect: /<\!--%fooTemplate\b.*?%-->/g,
        edit: function(html) { return html.replace(/\begg(s?)\b/ig, 'omelet$1'); }
      }))
    .pipe(gulp.dest('public/'));
});

//Junta CSS e minifica
gulp.task('concat-css', function() {
  return gulp.src(['css/bootstrap.css', 'css/animate.css', 'css/responsive.css'])
    .pipe(concat('vendor.css'))
    .pipe(minifyCSS({keepBreaks:false,keepSpecialComments: 0}))
    .pipe(gulp.dest('public/css/'));
});

//MINIFICA CSS
gulp.task('css', function() {
  return gulp.src(['css/fontello.css', 'css/main.css', 'css/owl.carousel.css', 'css/owl.transitions.css'])
    .pipe(minifyCSS({keepBreaks:false,keepSpecialComments: 0}))
    .pipe(gulp.dest('public/css'))
});
 
//Reduz tamanho das imagens
gulp.task('images', function(cb) {
    gulp.src(['images/**/*.png','images/**/*.jpg','images/**/*.gif','images/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('public/images')).on('end', cb).on('error', cb);
});