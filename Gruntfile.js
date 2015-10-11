module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dist: {
        src: 'src/main.js',
        dest: 'app.js',
        options: {
          debug: true
        }
      }
    },

    uglify: {
      dist: {
        src: 'app.js',
        dest: 'app.min.js'
      }
    },

    jshint: {
      dist: ['src/**/*.js']
    },

    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['buildjs']
      }
    }
  });

  grunt.registerTask('default', ['buildjs']);
  grunt.registerTask('buildjs', ['jshint', 'browserify:dist', 'uglify:dist']);
}