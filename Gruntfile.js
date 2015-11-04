module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // stylus: {
        //     compile: {
        //         files: {
        //             'css/demo.css': ['resources/css/stylus.styl']
        //         }
        //     }
        // },
        watch: {
            // scripts: {
            //     files: ['resources/css/stylus.styl'],
            //     tasks: ['stylus']
            // },
            client: {
                files: ['*.html', 'resources/css/*', 'resources/js/*', 'resources/images/**/*'],
                options: {
                    livereload: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('live', ['watch']);
    grunt.registerTask('default', ['stylus']);
}