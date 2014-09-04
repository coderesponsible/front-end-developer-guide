module.exports = function(grunt) {
  'use strict';
  var globalConfig = {
    data: 'javascript',
    template: 'page'
  };

  if(grunt.option('data') !== undefined){
    globalConfig.data = grunt.option('data');
  }
  if(grunt.option('template') !== undefined){
    globalConfig.template = grunt.option('template');
  }

  grunt.initConfig({
    globalConfig: globalConfig,
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: [
          {
            expand: true,
            cwd: 'sass/',
            src: ['**/*.scss'],
            dest: 'output/css/',
            ext: '.css',
          },
        ],
      }
    },
    browserify: {
      dist: {
        options: {
        },
        files: {
          'output/js/build/guide.js': ['js/modals.js', 'js/guide.js', 'js/video-thumbs.js']
        },
      }
    },
    uglify: {
      dist: {
        files:{
          'output/js/build/guide.min.js': ['output/js/build/guide.js']
        },
      }
    },
    'compile-handlebars': {
      // allStatic: {
      //     preHTML: 'partials/header.handlebars',
      //     postHTML: 'partials/footer.handlebars',
      //     template: 'templates/<%= globalConfig.template %>.handlebars',
      //     templateData: 'data/<%= globalConfig.data %>/index.json',
      //     output: 'output/<%= globalConfig.data %>/index.html',
      //     globals: [
      //         'content/contributors.json'
      //     ]
      // },
      globalJsonGlobbedTemplate: {
        preHTML: 'partials/header.handlebars',
        postHTML: 'partials/footer.handlebars',
        template: 'templates/**/*.handlebars',
        templateData: 'data/**/*.json',
        output: 'output/**/*.html',
        globals: [
          'content/contributors.json'
        ]
      },
    },
    watch: {
      css: {
        files: 'sass/**/*.scss',
        tasks: ['sass'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      scripts: {
        files: 'js/**/*.js',
        tasks: ['newer:browserify', 'newer:uglify'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      templates: {
        files: ['templates/**/*.handlebars','guide.json'],
        tasks: ['compile-handlebars'],
        options: {
          spawn: false,
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-compile-handlebars');
  grunt.registerTask('default',['watch']);
};