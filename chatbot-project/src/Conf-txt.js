const fs = require('fs');
const readline = require('readline');
const translate = require('translate');

// Configura la URL de LibreTranslate (servidor público)
translate.engine = 'libre';
translate.key = null; // No se necesita clave para la API pública
translate.url = 'https://libretranslate.com/translate';

// Archivo de entrada y salida
const inputFile = './swebok-text.txt';
const outputFile = './swebok-organized-es.txt';

// Función para traducir texto al español usando LibreTranslate
const translateText = async (text) => {
  try {
    const translated = await translate(text, { from: 'en', to: 'es' });
    return translated;
  } catch (error) {
    console.error('Error en la traducción:', error);
    return text; // Devuelve el texto original si falla la traducción
  }
};

// Función para limpiar y organizar el texto
const processLine = (line) => {
  if (!line.trim() || line.startsWith('Table of Contents') || line.startsWith('References')) {
    return null;
  }
  return line.trim();
};

// Función principal para procesar el archivo
const processFile = async () => {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(inputFile),
      crlfDelay: Infinity,
    });

    const outputStream = fs.createWriteStream(outputFile);

    for await (const line of rl) {
      const cleanedLine = processLine(line);
      if (cleanedLine) {
        const translatedLine = await translateText(cleanedLine);
        outputStream.write(translatedLine + '\n');
      }
    }

    console.log(`Archivo procesado y guardado en: ${outputFile}`);
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
  }
};

// Ejecuta el procesamiento
processFile();
