const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();



// compile scss into css
async function styleScss(){
    // 1. where is my scss file
    return gulp.src('dev/scss/**/*.scss')

    // 2. pass that file through sass compiler
    .pipe(sass().on('error', sass.logError))

    // 3. where do I save the compiled css?
    .pipe(gulp.dest('dist/css/'))
    
    // 4. stream changes to all browser
    .pipe(browserSync.stream());
}


// 把PUG轉成HTML
async function stylepug(){
    return gulp.src('dev/**/*.pug')
                .pipe(pug({
                    pretty: true
                }))
                .pipe(gulp.dest('dist/'))
}

// PUG跟SCSS和一起的函式
async function style(){
    stylepug();
    styleScss();
}





// gulp.task('pug',()=> {
//     return gulp.src('dev/**/*.pug')
//             .pipe(pug({
//                 pretty: true
//             }))
//             .pipe(gulp.dest('dist/'))
// })


function watch() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    gulp.watch('dev/scss/**/*.scss', style);
    gulp.watch('dev/**/*.pug', style);
    gulp.watch('dist/*.html').on('change' , browserSync.reload);
    gulp.watch('dev/js/**/*.js').on('change' , browserSync.reload);
}

exports.style = style;
exports.watch = watch;

// 在終端機打gulp style可以把    scss跟pug   寫入  css跟html
// watch可以把畫面應在網頁上 GoLive效果
