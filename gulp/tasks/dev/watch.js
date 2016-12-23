import gulp from 'gulp';
import config from '../../config';

// import { serve } from './serve';

import { hugo_dev, hugo_prod, hugo_reload } from './hugo';
import { images } from './images';
import { scripts } from './scripts';
import { styles } from './styles';

/**
 * Start browsersync task and then watch files for changes
 */
export function watch(done) {
  gulp.watch(config.watch.hugo, gulp.series(hugo_reload, hugo_dev));
  gulp.watch(config.watch.styles, gulp.series(styles));
  gulp.watch(config.watch.scripts, gulp.series(scripts));
  gulp.watch(config.watch.images, gulp.series(images));
  done();
}
