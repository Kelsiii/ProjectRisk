'use strict';


module.exports = function (grunt) {

    // Load the project's grunt tasks from a directory
    require('grunt-config-dir')(grunt, {
        configDir: require('path').join(__dirname, 'tasks')
    });

    // App tasks
    //grunt.registerTask('build', [ 'less', 'requirejs', 'i18n', 'copyto' ]);
    grunt.registerTask('build', [ 'jshint']);
    grunt.registerTask('test', [ 'jshint', 'mochacli', 'clean:tmp' ]);
    grunt.registerTask('lint', ['jshint']);

    // Build tasks
    grunt.loadNpmTasks('grunt-ci-suite');

};
