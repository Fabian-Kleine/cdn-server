const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const cache = require('../utils/cache');
const config = require('../config');
const postcss = require('postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

async function minifyFile(absolutePath) {
    const cssFile = fs.readFileSync(absolutePath);
    const output = await postcss([cssnano, autoprefixer]).process(cssFile, { from: absolutePath });
    return output.css;
}

router.get('/:cssfile(*)', async (req, res) => {
    const cssPath = req.params.cssfile;
    const absolutePath = path.join(__dirname, '../public/css', cssPath);
    try {
        if (config.cache) {
            const cachedFile = cache.getFile(cssPath, "css");
            if (cachedFile) {
                res.type('text/css').send(cachedFile);
                return;
            } else {
                const output = await minifyFile(absolutePath);
                cache.save(cssPath, output, "css");
                res.type('text/css').send(output);
                return;
            }
        }
        const output = await minifyFile(absolutePath);
        res.type('text/css').send(output);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;