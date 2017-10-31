const gulp 		= require( 'gulp' );
const babel 	= require( 'gulp-babel' );
const concat 	= require( 'gulp-concat' );
const plumber 	= require( 'gulp-plumber' );
const minify 	= require('gulp-minify');

// compress
gulp.task( 'compress', () => {
	return gulp.src('app/es5/MxClock.js')
		.pipe(minify({
	        ext:{
	        	src:'-debug.js',
	        	min:'.min.js'
	        }
	    }))
	    .pipe(gulp.dest('build/assets/js'))
	    .pipe(gulp.dest('demo/assets/js'))
} );

// compile
gulp.task( 'goBabel', () => {
	return 	gulp.src( 'app/MxClock.js' )
			.pipe( plumber() )
			.pipe( babel({
		        presets: ['es2015']
		    }) )
			.pipe( concat( 'MxClock.js' ) )
			.pipe( gulp.dest( 'app/es5/' ) )
} );

gulp.task( 'watch', () => {
	gulp.watch( 'app/MxClock.js', ['goBabel', 'compress'] )
} );