import autoprefixer from 'autoprefixer';

export default {
  root: './',
  output: '_site/',
  css: {
    src: '_css/**/*.?(s)css',
    dest: 'assets/',
    postcss: [
      autoprefixer
    ]
  },
  js: {
    src: '_js/**/*.js',
    dest: 'assets'
  },
  images: {
    src: '_images/**',
    dest: 'images'
  }
}
