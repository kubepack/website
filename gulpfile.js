/* eslint-disable func-names */

/* REQUIRES */
const gulp = require('gulp');
const fs = require('fs');
// Helper libraries
const _ = require('lodash');
const child = require('child_process');
const del = require('del');
const gutil = require('gulp-util');
const path = require('path');
const rev = require('gulp-rev');
const runSequence = require('run-sequence');
const util = require('util');
const wait = require('gulp-wait');

// Linting
const sassLint = require('gulp-sass-lint');

// File I/O
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const htmlreplace = require('gulp-html-replace');


/* FILE PATHS */
const paths = {
  layouts: {
    files: ['html/layouts/**/*.html'],
    srcDir: 'html/layouts',
    destDir: 'layouts'
  },

  js_global: {
    files: [
      'node_modules/codemirror/lib/codemirror.js',
      'node_modules/codemirror/mode/javascript/javascript.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/featherlight/release/featherlight.min.js',
      'node_modules/jquery-validation/dist/jquery.validate.js',
      'node_modules/js-cookie/src/js.cookie.js'
// 'node_modules/typed.js/dist/typed.min.js'
    ],
    ie: [
      'node_modules/html5shiv/dist/html5shiv.min.js',
      'node_modules/respond.js/dest/respond.min.js'
    ],
    destDir: 'build/js_global'
  },

  scss: {
    files: ['scss/**/*.scss'],
    srcDir: 'scss',
    destDir: 'build/css'
  },

  css_ext: {
    files: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bxslider/dist/jquery.bxslider.min.css',
      'node_modules/codemirror/lib/codemirror.css',
      'node_modules/featherlight/release/featherlight.min.css'
    ]
  },

  images: {
    files: ['images/**/*'],
    srcDir: 'images',
    destDir: 'build/images'
  },

  static: {
    files: ['static/**/*'],
    srcDir: 'static',
    destDir: 'build'
  },

  fonts: {
    files: [
      'fonts/**/*',
      'node_modules/font-awesome/fonts/fontawesome-webfont.svg',
      'node_modules/font-awesome/fonts/FontAwesome.otf',
      'node_modules/font-awesome/fonts/fontawesome-webfont.eot',
      'node_modules/font-awesome/fonts/fontawesome-webfont.ttf',
      'node_modules/font-awesome/fonts/fontawesome-webfont.woff2',
      'node_modules/font-awesome/fonts/fontawesome-webfont.woff'
    ],
    srcDir: 'fonts',
    destDir: 'build/fonts'
  },

  json: {
    files: ['products.json'],
    srcDir: 'products.json',
    destDir: 'data/'
  }
};

/* TASKS */
/* Lints the CSS files */
gulp.task('lint:css', () => {
  gulp.src(paths.scss.files)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

/* Compiles SCSS files into CSS files and copies them to the distribution directory */
gulp.task('scss', () => {
  const scssStream = gulp.src(paths.scss.files)
    .pipe(sass({
      outputStyle: 'compressed',
      errLogToConsole: true
    }))
    .pipe(concat('scss-files.scss'));

  const cssextStream = gulp.src(paths.css_ext.files)
    .pipe(concat('css-ext-files.css'));

  return merge(scssStream, cssextStream)
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rev())
    .pipe(gulp.dest(paths.scss.destDir))
    .pipe(rev.manifest({
      base: 'build',
      merge: true
    }))
    .pipe(gulp.dest('build'));
});

/* Development css task */
gulp.task('css:dev', () => {
  runSequence(/* 'lint:css',*/ 'scss');
});

/* Production css task */
gulp.task('css:prod', (done) => {
  runSequence(/* 'lint:css',*/ 'scss', (error) => {
    done(error && error.err);
  });
});

/* Copies files to the distribution directory */
['images', 'fonts', 'static', 'json'].forEach((fileType) => {
  gulp.task(fileType, () => gulp.src(paths[fileType].files)
      .pipe(gulp.dest(paths[fileType].destDir)));
});

/* Deletes the distribution directory */
gulp.task('clean', () => del(['build', 'public']));

function fixManifest(revman, key, d) {
  if (!revman[key]) {
    const index = key.indexOf('.');
    const prefix = `${key.substring(0, index)}-`;
    const suffix = key.substring(index);
    let aname,
      atime;
    if (fs.existsSync(d)) {
      fs.readdirSync(d).forEach((f) => {
        if (f.startsWith(prefix) && f.endsWith(suffix)) {
          fi = fs.statSync(path.join(d, f));
          mtime = new Date(util.inspect(fi.mtime));
          if (aname) {
            if (mtime > atime) {
              aname = f;
              atime = mtime;
            }
          } else {
            aname = f;
            atime = mtime;
          }
        }
      });
    }
    revman[key] = aname;
  }
}

/* Copies the Hugo's layout HTML file to the layouts directory */
gulp.task('layouts', () => {
  const ext = [];
  _.forEach(paths.js_global.files, (file) => {
    ext.push(`/js_global/${file.substring(file.lastIndexOf('/') + 1)}`);
  });

  const ie = [];
  _.forEach(paths.js_global.ie, (file) => {
    ie.push(`/js_global/${file.substring(file.lastIndexOf('/') + 1)}`);
  });

  let revman = {};
  if (fs.existsSync('./rev-manifest.json')) {
    revman = JSON.parse(fs.readFileSync('./rev-manifest.json', 'utf-8'));
  }
  fixManifest(revman, 'style.min.css', './build/css');
  return gulp.src(paths.layouts.files)
    .pipe(htmlreplace({
      js_global: ext,
      js_ie: ie,
      css: `/css/${revman['style.min.css']}`
    }))
    // .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.layouts.destDir));
});

/* Replaces image and link absolute paths with the correct production path */
gulp.task('copy:js_global', () => gulp.src([].concat(paths.js_global.files, paths.js_global.ie))
    .pipe(gulp.dest(paths.js_global.destDir)));

/* Copies files to the distribution directory */
['images', 'fonts'].forEach((fileType) => {
  gulp.task(fileType, () => gulp.src(paths[fileType].files)
      .pipe(gulp.dest(paths[fileType].destDir)));
});

/* Watches for file changes (JS file changes are watched elsewhere via watchify) */
gulp.task('watch', () => {
  const fileTypesToWatch = {
    scss: ['css:dev', 'layouts', 'trigger-hugo'],
    layouts: ['layouts'],
    fonts: ['fonts'],
    images: ['images']
  };

  _.forEach(fileTypesToWatch, (taskToRun, fileType) => {
    gulp.watch(paths[fileType].files, function () {
      runSequence.apply(this, taskToRun);
    });
  });
});

/* Replaces image and link absolute paths with the correct production path */
gulp.task('trigger-hugo', () => gulp.src(['rev-manifest.json'])
    .pipe(wait(1000))
    .pipe(gulp.dest('build')));

/* Build hugo contents */
gulp.task('hugo:prod', () => {
  const cmd = child.spawnSync('hugo', ['-v', '--config=config.yaml']);
  if (cmd.stderr.length) {
    const lines = cmd.stderr.toString()
      .split('\n')
      .filter(line => line.length);
    for (const line of lines) {
      gutil.log(gutil.colors.red(`Error [hugo:prod]: ${line}`));
    }
    notify({
      title: 'Error (go install)',
      message: lines
    });
  }
  return cmd;
});

/* Build hugo contents */
gulp.task('hugo:dev', () => {
  const cmd = child.spawnSync('hugo', ['-v', '--buildDrafts', '--config=config.yaml']);
  if (cmd.stderr.length) {
    const lines = cmd.stderr.toString()
      .split('\n')
      .filter(line => line.length);
    for (const line of lines) {
      gutil.log(gutil.colors.red(`Error [hugo:prod]: ${line}`));
    }

    notify({
      title: 'Error (go install)',
      message: lines
    });
  }
  return cmd;
});

/*
 * Restart application server.
 */
let hugo = null;
gulp.task('hugo:serve', () => {
  if (hugo) {
    hugo.kill();
  }

  /* Spawn application hugo */
  hugo = child.spawn('hugo', ['-v', 'server', '--watch', '--buildDrafts', '--config=config.yaml']);

  /* Pretty print hugo log output */
  hugo.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    for (const line of lines) {
      if (line.length) {
        gutil.log(line);
      }
    }
  });

  /* Print errors to stdout */
  hugo.stderr.on('data', (data) => {
    process.stdout.write(data.toString());
  });
});

/* Copies files to the distribution directory */
['dev', 'prod'].forEach((env) => {
  gulp.task(env, (done) => {
    // Stop using firebase-tools directly until https://github.com/firebase/firebase-tools/issues/136
    runSequence('clean', ['copy:js_global', 'css:prod', 'images', 'fonts', 'json', 'static'], 'layouts', `hugo:${env}`, (error) => {
      done(error && error.err);
    });
  });
});

// local
gulp.task('default', (done) => {
  runSequence('clean', 'copy:js_global', ['css:dev', 'images', 'fonts', 'json', 'static'], 'layouts', 'watch', 'hugo:serve', (error) => {
    done(error && error.err);
  });
});
