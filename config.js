const config = {
    //javascript minifier settings
    //find out more at https://terser.org/docs/options/
    minifier: {
        compress: {
            dead_code: false,
            drop_console: false,
            drop_debugger: true,
            keep_classnames: false,
            keep_fargs: true,
            keep_fnames: false,
            keep_infinity: false,
        },
        mangle: {
            eval: false,
            keep_classnames: false,
            keep_fnames: false,
            toplevel: false,
            safari10: false
        }
    },
    //server settings
    use_test_HTML: true, //when true index.html inside test folder is rendered when requesting '/'
    port: 3000, //port of the server
    cache: true, //when true minified css and js files are cached (recommended)
    clear_cache: true //when true the cache will be cleared on server restart (recommended)
}

module.exports = config;