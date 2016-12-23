const src        = 'app';
const build      = 'build';
const dev        = 'build/dev';
const prod       = 'build/prod';
const srcAssets  = 'app/assets';
const devAssets  = 'build/assets';
const prodAssets = 'build/prod/assets';

let config;

config = Object.assign({
  browsersync: {
    dev: {
      server: {
        baseDir: [dev, build, src]
      },
      port: 9999,
      files: [
        devAssets + '/css/*.css',
        devAssets + '/js/*.js',
        devAssets + '/images/**',
        devAssets + '/fonts/*'
      ]
    },
    prod: {
      server: {
        baseDir: [prod]
      },
      port: 9998
    }
  },
  delete: {
    dev: [devAssets],
    prod: [prodAssets]
  },
  styles: {
    src: srcAssets + '/styles/*.css',
    dest: devAssets + '/css',
    options: {
      autoprefixer: {
        browsers: [
          'last 2 versions',
          'ie9'
        ],
      },
    },
  },
  images: {
    src:  srcAssets + '/images/**/*',
    dest: devAssets + '/images'
  },
  watch: {
    hugo: [
      '_config.yml',
      '_config.build.yml',
      'stopwords.txt',
      src + 'hugo/data/**/*.{json,yml,csv}',
      src + '/_includes/**/*.{html,xml}',
      src + 'hugo/layouts/*.html',
      src + '/_locales/*.yml',
      src + '/content/**/*.{markdown,md}',
      src + '/**/*.{html,markdown,md,yml,json,txt,xml}',
      src + '/*'
    ],
    styles:  srcAssets + '/styles/**/*.css',
    scripts: srcAssets + '/scripts/**/*.js',
    images:  srcAssets + '/images/**/*',
    sprites: srcAssets + '/images/**/*.png',
    svg:     'vectors/*.svg'
  },
  jshint: {
    src: srcAssets + '/javascripts/*.js'
  },
  optimise: {
    css: {
      src: devAssets + '/css/*.css',
      dest: prodAssets + '/css/',
      options: {
        keepSpecialComments: 0
      }
    },
    js: {
      src: devAssets + '/js/*.js',
      dest: prodAssets + '/js/',
      options: {}
    }
  },
  revision: {
    src: {
      assets: [
        prodAssets + '/css/*.css',
        prodAssets + '/js/*.js',
        prodAssets + '/images/**/*'
      ],
      base: prod
    },
    dest: {
      assets: prod,
      manifest: {
        name: 'manifest.json',
        path: prodAssets
      }
    }
  },
  collect: {
    src: [
      prodAssets + '/manifest.json',
      prod + '/**/*.{html,xml,txt,json,css,js}',
      '!' + prod + '/feed.xml'
    ],
    dest: prod
  }
});


export default config;
