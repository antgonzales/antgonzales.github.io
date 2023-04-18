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
            atBegin: true
          }
        },
        css: {
          files: "assets/sass/**/*.scss",
          tasks: ["buildcss", "jekyll"],
          options: {
            interrupt: true,
            atBegin: true
          }
        },
        js: {
          files: ["Gruntfile.js", "assets/js/*.js"],
          tasks: ["buildjs", "jekyll"],
          options: {
            interrupt: true,
            atBegin: true
          }
        }
  		}

  });

  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-shell");

  grunt.registerTask("default",  ["jekyll"]);
  grunt.registerTask("buildcss",  ["sass", "cssc", "cssmin"]);
  grunt.registerTask("buildjs",  ["concat", "uglify"]);
  grunt.registerTask("jekyll", ["shell:jekyllBuild", "shell:jekyllServe"]);

};
