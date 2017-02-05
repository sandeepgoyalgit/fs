    var gulp= require('gulp'); 
    var concat= require('gulp-concat');
    var rename= require('gulp-rename');
    var uglify= require('gulp-uglify');    
    var stripDebug = require('gulp-strip-debug');
    gulp.task('scripts',function(){
        return gulp.src(['bower_components/jquery/dist/jquery.js','src/js/main.js','src/js/product.js'])
                .pipe(stripDebug())
                    .pipe(concat('main.js'))
                    .pipe(rename({suffix:'.min'}))
                    .pipe(uglify())
                    .pipe(gulp.dest('build/js'));                    
    });

    // var sass = require('gulp-sass');
    // gulp.task('sass', function() {
    //     return sass('bower_component/bootstrap/dist/css/bootstrap-theme.css', {style: 'compressed'})
    //         .pipe(rename({suffix: '.min'}))
    //         .pipe(gulp.dest('src/css'));
    // });

    var imagemin= require('gulp-imagemin');
    var cache= require('gulp-cache');
    gulp.task('images',function(){
        return gulp.src('src/images/**/*')
                    .pipe(cache(imagemin({  optimizationLevel: 5, progressive: true, interlaced: true})))
                    //.pipe(cache())
                    .pipe(gulp.dest('build/images'));
    });

    var jshint = require('gulp-jshint');

    gulp.task('lint', function() {
    return gulp.src('src/js/**')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
    });

    gulp.task('watch', function(){
        gulp.watch('src/js/*.js', ['scripts']);
        gulp.watch('src/images/**/*', ['images']);
    });

    var todo= require('gulp-todo');
    // generate a todo.md from your javascript files 
    gulp.task('todo', function() {
        gulp.src('src/js/**')
            .pipe(todo())
            .pipe(gulp.dest('build/todo'));
            // -> Will output a TODO.md with your todos 
    });
    gulp.task('default',['scripts','images','lint']);