    /// <binding ProjectOpened='default, watch' />
// Node modules
var fs = require('fs'), del = require('del'),
es = require('event-stream');

// Gulp and plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify-es').default;
var resx2js = require('gulp-resx2js');
var sass = require('gulp-sass')(require('sass'));
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var gulpif = require('gulp-if');
var argv = require('minimist')(process.argv.slice(2));
var cleanCSS = require('postcss-clean');




gulp.task('app', function () {

    return gulp.src([
        "js/namespace.js",
        "js/WebApiClient.js",
        "js/models/Cart.js",
        "js/models/OccupancyConfig.js",
        "js/models/TabbedOccupancy.js",
        "js/models/CartItem.js",
        "js/models/Guest.js",
        "js/models/Rateplan.js",
        "js/models/Upgrade.js",
        "js/models/Enums.js",
        "js/models/GuestCard.js",
        "js/models/SearchResult.js",
        "js/models/SpecialOffer.js",
        "js/models/Voucher.js",
        "js/models/VoucherCart.js",
        "js/models/VoucherCartItem.js",
        "js/models/PromoCode.js",
        "js/models/StripeClient.js",
        "js/app.js",
        "js/ViewModel.js"
    ])
        .pipe(concat('app.js'))
        .pipe(gulpif(argv['production'], uglify()))
        .pipe(gulp.dest('./dist/'));

});

gulp.task('thirdparty',function () {

    var locales = ["fr", "vi"]; // specify locales to include with moment
	var scripts = [
		"js/polyfills.js",
		"js/fitty.min.js",
        "Scripts/jquery-1.12.3.js",
        "Scripts/knockout-3.4.0.js",
        "Scripts/ackordion.min.js",
        "js/bower/i18next.min.js",
        "js/bower/i18nextXHRBackend.min.js",
        "js/bower/jquery-i18next.min.js",
        "js/bower/moment.min.js",
        "js/ui.js",
        "js/bower/daterangepicker.js",
        "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
    ];
    locales.forEach(function (x) { scripts.push("js/momentlocales/" + x + ".js") });

    return gulp.src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(gulpif(argv['production'], uglify()))
        .pipe(gulp.dest('./dist/'));

});

gulp.task('css', function () {
    var faCSS = gulp.src(["node_modules/@fortawesome/fontawesome-free/css/all.min.css", "node_modules/@fortawesome/fontawesome-free/css/v4-shims.min.css"]).pipe(replace(/url\((')?\.\.\/webfonts\//g, 'url($1/dist/webfonts/'));

    var bsCSS = gulp.src("node_modules/bootstrap/dist/css/bootstrap.min.css");

    mainCSS = gulp.src(["Content/sass/main.scss"])
        .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulpif(argv['production'], postcss([
            autoprefixer({ cascade: false }),
            cleanCSS({ compatibility: '*' })
        ])));

    combinedCss = es.concat(faCSS, bsCSS, mainCSS).pipe(concat('css.css')),
    faFontFiles = gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*', { base: './node_modules/@fortawesome/fontawesome-free/' });

    return es.concat(combinedCss, faFontFiles)
        .pipe(gulp.dest('./dist/'));
});

gulp.task('scripts-body', function () {

    return gulp.src([
        "js/bower/jquery.magnific-popup.min.js"
    ])
        .pipe(concat('scripts-body.js'))
        .pipe(gulpif(argv['production'], uglify()))
        .pipe(gulp.dest('./dist/'));

});

gulp.task('watch', function () {
    gulp.watch("js/**/*.js", gulp.series("app"));
    gulp.watch("Content/sass/**/*.scss", gulp.series("css"));
    //gulp.watch("Scripts/app/models/**/*.ts", ["guest"]);
    gulp.watch("Resources/*.resx", gulp.series("resx"));
});


// Removes all files from ./dist/
gulp.task('del', async function () {
    await del(['dist/**/*']);
//    var deletedFilePaths = await del(['dist/**/*']);
//    console.log('Deleted files:\n', deletedFilePaths.join('\n'));
});

gulp.task('default', function (callback) {
    // TODO TB do i need to add 'del' and 'resx'(resx only on 'watch'?)
    gulp.series('del', 'app', 'thirdparty', 'scripts-body', 'css')(function () {
        console.log('\nPlaced optimized files in dist/\n');
    });
    callback();
});
