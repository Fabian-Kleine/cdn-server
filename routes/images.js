const router = require('express').Router();
const path = require('path');
const sharp = require("sharp");

async function svgText(text, width, height) {
    const svgImage = `
    <svg width="${width}" height="${height}">
    <style>
    .title { fill: #000; font-size: 30px; font-weight: bold; font-family: arial; width: ${width}; white-space: pre;}
    </style>
    <text x="50%" y="50%" text-anchor="middle" class="title">${text}</text>
  </svg>
    `
    const imageBuffer = Buffer.from(svgImage);
    const image = await sharp(imageBuffer).png({ progressive: true }).toBuffer();
    return image;
}

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

        const image = await transform.toBuffer();

        res.type(metadata.format).send(image);
    } catch (error) {
        const image = await svgText("Server Error", "200px", "200px");

        console.log(error);
    
        res.type('png').send(image);
    }
})

module.exports = router;