
var gulp = require('gulp')
var s3 = require("gulp-s3")
var fs = require("fs")
var config = JSON.parse(fs.readFileSync('./config/s3.json'));

gulp.task('html', function(){
  gulp.src('./config/production-public/index.html')
    .pipe(gulp.dest('./build/public/'))
});

gulp.task('s3', function() {
  gulp.src('./build/public/**')
      .pipe(s3(config));
});

// gulp ---------------------------------- //

gulp.task('default', ['html', 's3']);
