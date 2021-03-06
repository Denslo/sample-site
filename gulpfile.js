var gulp = require('gulp');

var onError = function(err) {
  var notify = require('gulp-notify');
  var util = require('gulp-util');

  notify.onError({
    title:    "Gulp",
    subtitle: "Failure!",
    message:  "Error: <%= error.message %>",
    sound:    "Beep"
  })(err);

  util.log(util.colors.red('Error'), err.message);
  this.emit('end');
};

function onSuccess() {
  var notify = require('gulp-notify');
  return notify(function(file) {
    return { // Add gulpif here
      title: 'SUCCESS!!',
      subtitle: 'Success: '+ file.relative,
      message: 'Success: '+ file.relative,
      sound: "Pop"
    }
  });
}

gulp.task('js', function() {
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    var concat = require('gulp-concat');
    var plumber = require('gulp-plumber');

  return gulp.src('code/js/*.js')
    .pipe(plumber({errorHandler: onError}))
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/js'))
    .pipe(onSuccess());
});

gulp.task('jade', function() {
  var jade = require('gulp-jade');
  var minify = require('gulp-minify-html');
  var plumber = require('gulp-plumber');

  return gulp.src('code/jade/*.*')
      .pipe(plumber({errorHandler: onError}))
      .pipe(jade())
      .pipe(minify())
      .pipe(gulp.dest('./public/'))
      .pipe(onSuccess());
});

gulp.task('views', function() {
  return gulp.src('code/views/*.*')
             .pipe(gulp.dest('./cloud/views/'));
});

gulp.task('image', function(){

  return gulp.src(['code/image/**/*'])
    .pipe(gulp.dest('./public/image'))
    .pipe(onSuccess());

});

gulp.task('data', function(){

    return gulp.src(['code/data/**/*'])
        .pipe(gulp.dest('./cloud/'))
        .pipe(onSuccess());

});

gulp.task('copy_server', function(){

    return gulp.src(['main.js'])
        .pipe(gulp.dest('./cloud/'))
        .pipe(onSuccess());

});

gulp.task('humans', function() {
  return gulp.src('code/humans.txt')
             .pipe(gulp.dest('./public'))
});

gulp.task('css', function() {
  var less = require('gulp-less');
  var rename = require('gulp-rename');
  var min = require('gulp-minify-css');
  var concatCss = require('gulp-concat-css');
  var autoprefixer = require('gulp-autoprefixer');
  var plumber = require('gulp-plumber');

  return gulp.src('code/css/*.less')
    .pipe(plumber({errorHandler: onError}))
    .pipe(less())
    .pipe(concatCss('basic.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(min())
    .pipe(gulp.dest('./public/css'))
    .pipe(onSuccess());
});

gulp.task('clean',function(){
    var clean = require('gulp-clean');

    return gulp.src(['./public','./cloud'], {read: false,force: true})
        .pipe(clean());
});

gulp.task('start_server',function(){
    var nodemon = require('gulp-nodemon');
    nodemon({ script: 'main.js', ext: 'js', ignore: ['public/**','code/js/**'] })
        .on('change', function(){
            console.log('changed!')
        })
        .on('restart', function () {
            console.log('restarted!')
        })
});

gulp.task('apps', function() {
    return gulp.src('code/anapps/backand/**')
        .pipe(gulp.dest('./public'))
});

gulp.task('watch', ['compile'], function(){
  gulp.watch('code/css/*.*', ['css']);
  gulp.watch('code/image/*.*', ['image']);
  gulp.watch('code/jade/*.*', ['jade']);
  gulp.watch('code/js/*.*', ['js']);
  gulp.watch('code/main.js', ['copy_server']);
  gulp.watch('code/views/*.*', ['views']);
});

gulp.task('compile', ['clean'], function() {
    gulp.start('css', 'image', 'jade', 'js', 'humans', 'views','copy_server','data','apps');
});

gulp.task('deploy', ['compile']);

gulp.task('default', ['compile', 'watch'], function(){
    gulp.start('start_server');
});
