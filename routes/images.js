const router = require('express').Router();
const path = require('path');
const sharp = require("sharp");

async function svgText(text, width, height) {
    const svgImage = `
    <svg width="${width}" height="${height}">
    <style>
    .title { fill: #000; font-size: ${parseFloat(width.replace("px","")) * .1}px; font-weight: bold; font-family: arial; width: ${width}; white-space: pre;}
    </style>
    <rect x="0" y="0" width="${width}" height="${height}" fill="#DDDDDD" />
    <text x="50%" y="50%" text-anchor="middle" class="title">${text}</text>
  </svg>
    `
    const imageBuffer = Buffer.from(svgImage);
    const image = await sharp(imageBuffer).png({ progressive: true }).toBuffer();
    return image;
}

router.get('/placeholder/:width/:height?/:text?', async (req,res) => {
    const width = req.params.width;
    const height = req.params.height || width;
    const text = req.params.text || `${width} X ${height}`;

    try {
        const image = await svgText(text, `${width}px`, `${height}px`);

        res.type('png').send(image);
    } catch (error) {
        const image = await svgText("Server Error", "200px", "200px");

        console.log(error);
    
        res.type('png').send(image);
    }
});

router.get('/:image(*)', async (req, res) => {
    const imagePath = req.params.image;
    const absolutePath = path.join(__dirname, '../public/img', imagePath);

    try {
        const metadata = await sharp(absolutePath).metadata();
        let transform = sharp(absolutePath);

        if (req.query.size) transform = transform.resize(parseFloat(req.query.size));

        if(req.query.crop) {
            const cropValues = JSON.parse(req.query.crop);
            transform = transform.extract(cropValues);
        }

        if(req.query.blur) transform = transform.blur(parseFloat(req.query.blur));

        if(req.query.grayscale) transform = transform.grayscale();

        if(req.query.flip) transform = transform.flip();

        if(req.query.flop) transform = transform.flop();

        const image = await transform.toBuffer();

        res.type(metadata.format).send(image);
    } catch (error) {
        const image = await svgText("Server Error", "200px", "200px");

        console.log(error);
    
        res.type('png').send(image);
    }
});

module.exports = router;