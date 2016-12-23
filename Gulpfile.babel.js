const child = require('child_process');
const browserSync = require('browser-sync').create();
import del from 'del';

const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
import changed from 'gulp-changed';


import config  from './_config';


gulp.task('css', () => {
  gulp.src(config.css.src)
    .pipe(sass())
    .pipe(gulp.dest(config.css.dest));
});

gulp.task('images', () => {
  gulp.src(config.images.src)
    .pipe(changed(config.images.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.images.dest));
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', () => {
  browserSync.init({
    // files: [config.output + '/**'],
    files: ['_site/**'],
    port: 4000,
    server: {
      // baseDir: config.output
      baseDir: '_site'
    }
  });

  gulp.watch(config.css.src, gulp.series('css'));
});

gulp.task('clean', (done) => {
  del.sync(config.output)
  done();
});

gulp.task('default', gulp.series(
  gulp.parallel('css', 'jekyll', 'serve'),
));
