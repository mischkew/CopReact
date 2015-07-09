'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    less: {
      dist: {
        options: {
          paths: ['./src/less/**'],
          compress: true,
          sourceMaps: true,
          sourceMapFile: 'public/app.min.css.map'
        },
        files: {
          'public/app.min.css': './src/less/*.less'
        }
      }
    },

    browserify: {
      options: {
        browserifyOptions: {
           debug: true
        },
        watch: true,
        transform: [
          'babelify',
          'debowerify',
          'reactify'
        ]
      },
      dist: {
        files: {
          'public/app.js': 'src/app.js'
        }
      }
    },

    copy: {
      dist: {
        files: [
          // copy css-bower deps here
          {
            expand: true,
            cwd: './bower_components/bootstrap/less',
            src: ['**'],
            dest: 'src/less/vendor/bootstrap'
          },

          // html
          {
            expand: true,
            cwd: './src',
            src: ['index.html'],
            dest: './public'
          },

          // images
          {
            expand: true,
            cwd: './src',
            src: ['images/*'],
            dest: './public'
          }
        ]
      }
    },

    watch: {
      all: {
        files: 'src/**/*',
        tasks: ['build']
      }
    },

    connect: {
      dev: {
        options: {
          port: 3000,
          base: './public'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('build', [
    'copy',
    'less',
    'browserify',
  ]);

  grunt.registerTask('default', [
    'connect',
    'build',
    'watch'
  ]);

};
