module.exports = function(grunt){
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

      sass: {
          build: {
            files: {
              "build/css/master.css": "assets/sass/master.scss"
            }
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
            "build/css/master.css": "build/css/master.css"
          }
        }
      },

      cssmin: {
        build: {
          files: {
            "build/css/master.min.css": "build/css/master.css"
          }
        }
      },

      jshint: {
        files: ["Gruntfile.js", "assets/js/main.js"],
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

      imagemin: {
        dynamic: {
          options: {
            optimizationLevel: 7
          },
          files: [
            {
              expand: true,
              cwd: 'assets/img/',
              src: ['*.{png,jpg,gif}'],
              dest: 'build/img/'
            }
          ]
        }
      },

      concat: {
        options: {
          separator: ";"
        },
        dist: {
          src: "assets/js/*.js",
          dest: "build/js/base.js"
        }
      },

      uglify: {
        build: {
          files: {
            "build/js/base.min.js": "<%= concat.dist.dest %>"
          }
        }
      },

      shell: {
        jekyllBuild: {
            command: "jekyll build"
        },
        jekyllServe: {
            command: "jekyll serve"
        }
      },

  		watch: {
        html: {
          files: [
            "index.html",
            "blog.html",
						"bubble-sort-application.html",
            "_includes/*.html",
            "_layouts/*.html",
            "_posts/*.markdown",
            "_config.yml"
          ],
          tasks: ["jekyll"],
          options: {
            interrupt: true,
            atBegin: true,
            livereload: true
          }
        },
        css: {
          files: "assets/sass/**/*.scss",
          tasks: ["buildcss"]
        },
        js: {
          files: ["Gruntfile.js", "assets/js/*.js"],
          tasks: ["buildjs"]
        },
        images: {
          files: ["assets/img/*.png"],
          tasks: ["compressimg"]
        }
  		}
  });

  grunt.registerTask("default",  ["jekyll"]);
  grunt.registerTask("buildcss",  ["sass", "cssc", "cssmin"]);
  grunt.registerTask("buildjs",  ["concat", "uglify"]);
  grunt.registerTask("compressimg",  ["imagemin"]);
  grunt.registerTask("jekyll", ["shell:jekyllBuild", "shell:jekyllServe"]);

};
