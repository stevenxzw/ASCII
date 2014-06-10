module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	
	app : {
		src : 'public/src-js',
		dist : 'public/js'
	},
	
	
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= app.src %>.js',
        dest: '<%= app.dist %>.min.js'
      }
    },
	
	watch: {
	  gruntfile: {
        files: ['Gruntfile.js']
      }
	}
  });
  // Load the plugin that provides the "uglify" task.
  var task  = grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.loadNpmTasks('grunt-contrib-ascii');
  
  console.log(task);
  
  
  // Default task(s).
  grunt.registerTask('default', ['uglify']);
};