import { argv } from 'yargs';

export default {
  root: './',
  output: '_site',
  css: {
    src: '_css/**/*.?(s)css',
    dest: 'assets'
  }
}
