module.exports = function(grunt){
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      htmlhint: {
        build: {
        options: {
            'tag-pair': true,
            'tagname-lowercase': true,
            'attr-lowercase': true,
            'attr-value-double-quotes': true,
            'doctype-first': true,
            'spec-char-escape': true,
            'id-unique': true,
            'head-script-disabled': true,
            'style-disabled': true
        },
        src: ['index.html']
        }
			},

      cssc: {
        build: {
          options: {
              sortSelectors: true,
              lineBreaks: true,
              sortDeclarations:true,
              consolidateViaDeclarations: false,
              consolidateViaSelectors:    false,
              consolidateMediaQueries:    false
          },
          files: {
              'build/css/master.css': 'build/css/master.css'
          }
        }
      },

      cssmin: {
          build: {
            src: 'build/css/master.css',
            dest: 'build/css/master.css'
        }
      },

      sass: {
          build: {
            files: {
                'build/css/master.css': 'assets/sass/master.scss'
            }
          }
      },

    jshint: {
      files: ['Gruntfile.js', 'assets/js/main.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['assets/js/waypoints.js', 'assets/js/Chart.min.js', 'assets/js/jquery.inview.min.js', 'assets/js/jquery.typer.js', 'assets/js/plugins.js', 'assets/js/main.js'],
        dest: 'build/js/base.js'
      }
    },

    uglify: {
      build: {
        src:'<%= concat.dist.dest %>',
        dest:'build/js/base.min.js'
      }
    },

		watch: {
      html: {
        files: 'index.html',
        tasks: ['htmlhint']
      },
      css: {
        files: 'assets/sass/**/*.scss',
        tasks: ['buildcss']
      },
      js: {
        files: ['Gruntfile.js', 'assets/js/*.js'],
        tasks: ['buildjs']
      }
		}
  
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.task.registerTask('default',  []);
  grunt.task.registerTask('buildcss',  ['sass', 'cssc']);
  grunt.task.registerTask('buildjs',  ['concat', 'uglify']);

};

//