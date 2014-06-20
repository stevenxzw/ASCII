module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	
	app : {
		src : 'public/src-js',
		dist : 'public/js',
		temp : 'temp/'
	},
	
	uglify : {
      options: {
        mangle: true
      },
      main: {
        options: {
            //banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        src: '<%= app.temp %>qq.js',
        dest: '<%= app.temp %>qq.min.js'
      }
	},
	
	ascii : {
		toAsciiCode : {
			options : {
				
			},
			
			files : {
				'<%= app.temp %>/ascii.js' : '<%= app.temp %>qq.min.js'
			}
		},
		
		
		toEndCode : {
			options : {
				
			},
			
			files : {
				'<%= app.temp %>/gfq.js' : '<%= app.temp %>/ascii.js'
			}
		}		
	},
	
	copy: {
		v5: {
			files: [
				{
					expand:true,
					cwd: '<%= app.temp %>/',
					src: 'gfq.js',
					dest: '../../workspace/gitwork/gaofen-js/js/',
					filter: 'isFile'
				}
			]
		},
		
		v2: {
			files: [
				{
					expand:true,
					cwd: '<%= app.temp %>/',
					src: 'gfq.js',
					dest: '../../workspace/gitwork/gaofen-static-v2/static/js',
					filter: 'isFile'
				}
			]
		}
	},
	
	
	watch: {
	  gruntfile: {
        files: ['Gruntfile.js']
      }
	}
  });
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('my-contrib-ascii');
  

  
  
  // Default task(s).
  grunt.registerTask('gfq', ['uglify', 'ascii', 'copy']);
  
  grunt.registerTask('default', ['uglify']);
  
  grunt.registerTask('v5', ['uglify', 'ascii', 'copy:v5']);
  grunt.registerTask('v2', ['uglify', 'ascii', 'copy:v2']);
  
};