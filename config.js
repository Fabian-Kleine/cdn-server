const config = {
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
    }
}

module.exports = config;