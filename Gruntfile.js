var path = require('path');

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
    'tsc': {
       options: {
         tscPath: path.resolve('node_modules', 'typescript', 'bin', 'tsc')
       },
       lib: {
         options: {
           project: './lib'
         }
       },
       test: {
         options: {
           project: './test'
         }
       }
    },
    'dtsGenerator': {
      options: {
        baseDir: './lib',
        name: 'polymer-ts-decorators',
        out: 'lib/decorators.d.ts',
        main: 'polymer-ts-decorators/decorators',
        target: 'es5'
      },
      default: {
        src: ['lib/decorators.ts']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-tsd');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-typedoc');
  grunt.loadNpmTasks('grunt-tsc');
  grunt.loadNpmTasks('dts-generator');
  
  grunt.registerTask('docs', ['typedoc']);
  
  grunt.registerTask('build', ['tsc:lib', 'dtsGenerator', 'tsc:test']);
  
  grunt.registerTask('run-tests', ['mochaTest:test']);
  
  grunt.registerTask('test', ['build', 'tslint', 'run-tests']);

  grunt.registerTask('default', ['test']);
};
