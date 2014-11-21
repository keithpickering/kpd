module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          '_site/css/main.css': '_assets/css/main.scss',
          '_site/css/about.css': '_assets/css/about.scss'
        }
      }
    },
    autoprefixer: {
      dist: {
        files: {
          '_site/css/main.css': '_site/css/main.css',
          '_site/css/about.css': '_site/css/about.css'
        }
      }  
    },
    cssmin: {
      dist: {
        options: {
          'keepSpecialComments': 0
        },
        files: {
          '_site/css/main.min.css': '_site/css/main.css',
          '_site/css/about.min.css': '_site/css/about.css'
        }
      }
    },
    uglify: {
      options: {
      },
      dist: {
        files: {
          '_site/js/main.min.js': ['_assets/js/jscroll.js', '_assets/js/jekyll-search.js', '_assets/js/twitter-fetch.js', '_assets/js/scrolly.js', '_assets/js/main.js']
        }
      }
    },
    jekyll: {
      dev: {
        options: {
          src: '.',
          dest: '_site',
          config: '_config.yml,_config-dev.yml'
        }
      },
      prod: {
        options: {
          src: '.',
          dest: '_site',
          config: '_config.yml'
        }
      }
    },
    watch: {
      markup: {
        files: ['index.html', '_includes/*.html', '_layouts/*.html', '_posts/**/*', 'about/index.html'],
        tasks: ['jekyll:dev'],
          options: {
          livereload: true
        }
      },
      css: {
        files: ['_assets/css/*.scss', '_assets/css/**/*.scss'],
        tasks: ['sass', 'autoprefixer', 'cssmin'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['_assets/js/*.js', '_assets/js/**/*.js'],
        tasks: ['uglify'],
        options: {
          livereload: true
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 2000,
          hostname: 'localhost',
          base: '_site'
        }
      }
    }
  });

  //load npm tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'uglify']);

  grunt.registerTask('serve', ['connect', 'default', 'jekyll:dev', 'watch']);
  grunt.registerTask('prod', ['default', 'jekyll:prod'])
};