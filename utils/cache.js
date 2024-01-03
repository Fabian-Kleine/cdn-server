const fs = require('fs');
const path = require('path');

const clear = () => {
    const folderPath = path.join(__dirname, '../cache');

    if (fs.existsSync(folderPath)) {
        fs.rmSync(folderPath, { recursive: true, force: true }, err => {
            if (err) throw err;
        });
    }

    return true;
}

const getFile = (filePath, fileType) => {
    const absoluteFilePath = path.join(__dirname, `../cache/${fileType}`, filePath);

    if (!fs.existsSync(absoluteFilePath)) return false;
    
    const outputFile = fs.readFileSync(absoluteFilePath);

    return outputFile;
}

const save = (filePath, fileContent, fileType) => {
    const absoluteFilePath = path.join(__dirname, `../cache/${fileType}`, filePath);
    const absoluteFolderPath = path.dirname(absoluteFilePath);

    if (!fs.existsSync(absoluteFolderPath)) {
        fs.mkdirSync(absoluteFolderPath, {recursive: true});
    }

    fs.writeFileSync(absoluteFilePath, fileContent, err => {
        if (err) throw err;
    });

    return true;
}

const cache = {
    clear,
    getFile,
    save
}

module.exports = cache;