const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { minify } = require('terser');
const cache = require('../utils/cache');
const config = require('../config');

async function minifyFile(absolutePath) {
    const jsFile = fs.readFileSync(absolutePath, 'utf8');
    const minified = await minify(jsFile, config.minifier);
    return minified.code;
}

router.get('/:jsfile(*)', async (req, res) => {
    const jsPath = req.params.jsfile;
    const absolutePath = path.join(__dirname, '../public/js', jsPath);
    try {
        if (config.cache) {
            const cachedFile = cache.getFile(jsPath, "js");
            if (cachedFile) {
                res.type('text/javascript').send(cachedFile);
                return;
            }
            const minified = await minifyFile(absolutePath);
            cache.save(jsPath, minified, "js");
            res.type('text/javascript').send(minified);
            return;
        }
        const minified = await minifyFile(absolutePath);
        res.type('text/javascript').send(minified);
    } catch (error) {
        console.log(error);
        const script = `console.error("Server Error: ${error}")`;
        res.type('text/javascript').send(script);
    }
});

module.exports = router;