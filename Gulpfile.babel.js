const bs = require('browser-sync').create();
import cp          from 'child_process';
import del         from 'del';
import cssnano     from 'gulp-cssnano';
import gulp        from 'gulp';
import gulpif      from 'gulp-if';
import gutil       from 'gulp-util';
import postcss     from 'gulp-postcss';
import sass        from 'gulp-sass';
import changed     from 'gulp-changed';

import config     from './config';

const production = !!gutil.env.production;
const jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
const messages = { jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build' };

gulp.task('css', (done) => {
  gulp.src(config.css.src)
    .pipe(sass())
    .pipe(postcss(config.css.postcss))
    .pipe(gulpif(production, cssnano()))
    .pipe(gulp.dest(config.output + config.css.dest))
    .pipe(bs.stream())
    .pipe(gulp.dest(config.css.dest))
    done();
});

gulp.task('images', () => {
  gulp.src(config.images.src)
    .pipe(changed(config.images.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.images.dest))
    .pipe(bs.stream());
});

gulp.task('jekyll-build', (done) => {
  cp.spawn(jekyll, ['build', '--incremental'], {stdio: 'inherit'})
    .on('close', done);
  bs.notify(messages.jekyllBuild);
});

gulp.task('serve-reload', (done) => {
  bs.reload();
  done();
});

gulp.task('jekyll-rebuild', gulp.series('jekyll-build', 'serve-reload'));

gulp.task('serve', (done) => {
  bs.init({
    server: {
      baseDir:'_site'
    },
    open: false
  });
  done();
});

gulp.task('watch', (done) => {
  gulp.watch(config.css.src, gulp.series('css'));
  gulp.watch(['_data/*', '_includes/*', '_layouts/*', '_pages/*', '_posts/*'], gulp.series('jekyll-build', 'serve-reload'))
  done();
});

gulp.task('clean', (done) => {
  del.sync(config.output)
  done();
});

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('jekyll-build', 'css'),
  gulp.parallel('watch', 'serve')
));
