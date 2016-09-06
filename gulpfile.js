// Include gulp
var gulp = require('gulp');

// Include Plugins
var util         = require('gulp-util');
var jshint       = require('gulp-jshint');
var sass         = require('gulp-ruby-sass');
var cleanCSS     = require('gulp-clean-css');
var uglify       = require('gulp-uglify');
var include      = require('gulp-include');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var stripDebug   = require('gulp-strip-debug');
var svgstore     = require('gulp-svgstore');
var rename       = require("gulp-rename");

// Variables for directories and assets
var vars = {
	'base' : 'assets/',
	'src'  : 'assets-src/',
	'built': 'assets-built/',
	'sass' : {
		'dir': 'styles/',
		'ext': '*.scss'
	},
	'scripts': {
		'dir': 'scripts/',
		'ext': '*.js'
	},
	'vendorScripts': {
		'dir': 'scripts/vendor/',
		'ext': '*.js'
	},
	'images': {
		'dir': 'images/',
		'ext': [
			'**/*.jpg',
			'**/*.png'
		]
	},
	'svg': {
		'dir': 'svg/',
		'ext': '*.svg'
	}
}

// Paths for assets
var paths = {
	'sass': {
		'dir'   : vars.base + vars.src + vars.sass.dir,
		'input' : vars.base + vars.src + vars.sass.dir + '!(_)' + vars.sass.ext,
		'watch' : vars.base + vars.src + vars.sass.dir + '**/' + vars.sass.ext,
		'output': vars.base + vars.built + vars.sass.dir
	},
	'scripts': {
		'input' : vars.base + vars.src + vars.scripts.dir + 'main.js',
		'watch' : vars.base + vars.src + vars.scripts.dir + '**/' + vars.scripts.ext,
		'output': vars.base + vars.built + vars.scripts.dir
	},
	'vendorScripts': {
		'input' : vars.base + vars.src + vars.scripts.dir + 'vendor.js',
		'watch' : [
				vars.base + vars.src + vars.scripts.dir + 'vendor.js',
				vars.base + vars.src + vars.vendorScripts.dir + '**/' + vars.scripts.ext, 
				],
		'output': vars.base + vars.built + vars.scripts.dir
	},
	'images': {
		'input' : prepend_array_values(vars.base + vars.images.dir, vars.images.ext),
		'output': vars.base + vars.images.dir,
		'svg'   : vars.base + vars.images.dir + vars.images.svg
	},
	'svg': {
		'input' : vars.base + vars.src + vars.svg.dir + vars.svg.ext,
		'watch' : vars.base + vars.src + vars.svg.dir + vars.svg.ext,
		'output': vars.base + vars.built + vars.svg.dir,
	}
}




// Compile Sass
// Autoprefix, minify, and generate sourcemaps
gulp.task('sass', function () {	
	return sass(paths.sass.input, {sourcemap: true})
		.on('error', handleError)
		.pipe(autoprefixer(['last 3 versions']))
		.pipe(cleanCSS())
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'source'
        }))
		.pipe(gulp.dest(paths.sass.output));
});

// Lint our scripts
gulp.task('lint', function() {
	return gulp.src(paths.scripts.input)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('appScripts', function() {
	var stream = gulp.src(paths.scripts.input).pipe(include());

	if (util.env.production) {
		stream = stream.pipe(stripDebug()).pipe(uglify());
	} else {
		stream = stream.pipe(uglify());
	}

	return stream.pipe(gulp.dest(paths.scripts.output));
});

// Concatenate & Minify Vendor JS
gulp.task('vendorScripts', function() {
	var stream = gulp.src(paths.vendorScripts.input).pipe(include());

	if (util.env.production) {
		stream = stream.pipe(stripDebug()).pipe(uglify());
	} else {
		stream = stream.pipe(uglify());
	}

	return stream.pipe(gulp.dest(paths.vendorScripts.output));
});

gulp.task('svgstore', function () {
    return gulp
        .src(paths.svg.input)
        .pipe(rename({ prefix: 'icon-' }))
        .pipe(svgstore())
        .pipe(rename('icons.svg'))
        .pipe(gulp.dest(paths.svg.output));
});






// *****************************//
//	Helper tasks
// *****************************//

// Default Task
gulp.task('default', ['lint', 'sass', 'appScripts', 'vendorScripts', 'svgstore']);

// Watch Files For Changes
gulp.task('watch', ['lint', 'sass', 'appScripts', 'vendorScripts', 'svgstore'], function() {
	gulp.watch(paths.scripts.watch, ['lint', 'appScripts']);
	gulp.watch(paths.vendorScripts.watch, ['vendorScripts']);
	gulp.watch(paths.sass.watch, ['sass']);
	gulp.watch(paths.svg.watch, ['svgstore']);
});








// *****************************//
//	Helper Functions 
// *****************************//

// Output any errors but keep on running
function handleError(err) {
	exec("osascript -e 'display notification \"Check your console for the error message.\" with title \"Error: "+err.plugin.toString()+"\"'", 
		function(error, stdout, stderr){ 
			sys.puts(stdout); 
		}
	);
	console.log(err.message);
	this.emit('end');
}

// prepend string to array values 
function prepend_array_values(string, array) {
	for(i=0; i<array.length; i++) {
	    array[i] = string + array[i];
	};
	return array;
}


