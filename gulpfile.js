var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var sort = require('gulp-sort');
var print = require('gulp-print');
var _ = require('lodash');
var imagemin = require('gulp-imagemin');

var f = -1;

gulp.task('sprite-sheet', function () {
  gulp.src('use/*.png')
  .pipe(sort({
    customSortFn: function(files, comparator) {
      var temp = [];
      _.each(files, function (file) {
        console.log(parseInt(file.relative.toString().replace('.png')))
        var num = parseInt(file.relative.toString().replace('.png'));
        temp.push({i:num, f: file});
      });

      return _.map(_.sortBy(temp, 'i'), function (file) {
        return file.f;
      });

    }
  }))
  .pipe(print()).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    algorithm: 'left-right',
    algorithmOpts: {sort: false}
  })).pipe(gulp.dest('output/'));
});

gulp.task('optimize', function () {
  gulp.src('output/*.png')
  .pipe(imagemin())
  .pipe(gulp.dest('output/optimized/'))
});

gulp.task('sprite', ['sprite-sheet', 'optimize']);
