const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { minify } = require('terser');
const config = require('../config');

router.get('/:jsfile(*)', async (req, res) => {
    const jsPath = req.params.jsfile;
    const absolutePath = path.join(__dirname, '../public/js', jsPath);
    try {
        const jsFile = fs.readFileSync(absolutePath, 'utf8');
        const minified = await minify(jsFile, config.minifier);
        res.type('text/javascript').send(minified.code);
    } catch (error) {
        console.log(error);
        const script = `console.error("Server Error: ${error}")`;
        res.type('text/javascript').send(script);
    }
});

module.exports = router;