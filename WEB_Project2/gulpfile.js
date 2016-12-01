var gulp        = require('gulp');
var minifyCss   = require('gulp-minify-css');
var sass        = require('gulp-sass');
var notify      = require('gulp-notify');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

//npm install --global gulp
//npm install --save-dev gulp
//npm install --save-dev gulp-minify-css
//npm install --save-dev gulp-notify
//npm install --save-dev gulp-sass
//npm install --save-dev browser-sync
//npm install -g browser-sync

gulp.task('mincss', function(){
  return gulp.src('main.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('main'));
});

var paths = {
  //css:['D:/univer/WEB/WEB_Project2/main.css', 'D:/univer/WEB/WEB_Project2/main/main.css'],
  css:['D:/univer/WEB/WEB_Project2/main.css'],
  txt:['D:/univer/WEB/WEB_Project2/newDoc.txt'],
  html:['D:/univer/WEB/WEB_Project2/myHtml.txt']
};

gulp.task('myWatcher', function(){
	gulp.watch([paths.css], function(){
		console.log('CSS has been changed');
	});
	gulp.watch([paths.txt], function(){
		console.log('my Doc has been nchanged');
	});
	gulp.watch([paths.css], ['mincss']);
	gulp.watch(paths.html, ['html']);
});

gulp.task('minscss', function(){
 return gulp.src('mysass.scss')
   .pipe(sass().on('error', sass.logError))
   .pipe(minifyCss())
   .pipe(gulp.dest('main'))
   .pipe(notify('Done!'));
});

gulp.task('html', function(){
	return gulp.src(paths.html)
	.pipe(reload({stream:true}));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
    port: 8080,
    open: true,
    notify: false
  });
});

gulp.task('default', ['browserSync', 'myWatcher']);

//gulp.watch('main.css', function(){
//  console.log('seen');
//});
