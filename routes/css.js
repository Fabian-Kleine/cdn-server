const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const postcss = require('postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

router.get('/:cssfile(*)', async (req,res) => {
    const cssPath = req.params.cssfile;
    const absolutePath = path.join(__dirname, '../public/css', cssPath);
    try {
        const cssFile = fs.readFileSync(absolutePath);
        const output = await postcss([cssnano, autoprefixer]).process(cssFile, {from: absolutePath});
        res.type('text/css').send(output.css);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;