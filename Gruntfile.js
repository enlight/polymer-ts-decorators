module.exports = function(grunt) {
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'mochaTest': {
      test: {
        options: {
          quiet: false,
          clearRequireCache: true,
        },
        src: ['test/**/*.js']
      }
    },
    'tsd': {
      test: {
        options: {
          command: 'reinstall',
          latest: true,
          config: 'conf/tsd-test.json',
          opts: {
            // props from tsd.Options
          }
        }
      }
    },
    'tslint': {
      errors: {
        options: {
          configuration: grunt.file.readJSON('conf/tslint.json')
        },
        files: {
          src: [
            'src/**/*.ts'
          ]
        }
      }
    },
    'typedoc': {
      build: {
        options: {
          mode: 'file',
          module: 'commonjs',
          target: 'es5',
          out: 'docs/',
          name: '<%= pkg.name %>'
        },
        src: 'src/**/*.ts'
      }
    },
    'typescript': {
       lib: {
         src: ['src/**/*.ts'],
         dest: 'lib',
         options: {
           module: 'commonjs',
           noImplicitAny: true,
           sourceMap: true,
           target: 'es5'
         }
       },
       test: {
         src: ['test/**/*.ts'],
         options: {
           module: 'commonjs',
           sourceMap: true,
           target: 'es5'
         }
       }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-tsd');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-typedoc');
  grunt.loadNpmTasks('grunt-typescript');
  
  grunt.registerTask('docs', ['typedoc']);
  
  grunt.registerTask('build', ['typescript']);
  
  grunt.registerTask('run-tests', ['mochaTest:test']);
  
  grunt.registerTask('test', ['build', 'tslint', 'run-tests']);

  grunt.registerTask('default', ['test']);
};
