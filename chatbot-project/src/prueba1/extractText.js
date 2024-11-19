const fs = require('fs');
const pdf = require('pdf-parse');

const readPDF = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
};

readPDF('./libro/swebok-v4.pdf').then(text => {
    fs.writeFileSync('swebok-text.txt', text);
    console.log('Texto extraído y guardado en swebok-text.txt');
}).catch(err => {
    console.error('Error al leer el PDF:', err);
});