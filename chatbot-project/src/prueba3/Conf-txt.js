const fs = require('fs');
const readline = require('readline');

// Archivo de entrada y salida
const inputFile = './src/swebok-text.txt';
const outputFile = './src/swebok-organized.txt';

// Función para limpiar y organizar las líneas del texto
const processLine = (line) => {
  // Elimina líneas vacías y encabezados innecesarios
  if (
    !line.trim() || // Línea vacía
    line.startsWith('Table of Contents') || // Tabla de contenido
    line.startsWith('References') || // Referencias
    line.startsWith('Index') || // Índice
    /^\d+$/.test(line.trim()) // Números sueltos (páginas o secciones)
  ) {
    return null;
  }

  // Otras reglas personalizadas de limpieza
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
        outputStream.write(cleanedLine + '\n');
      }
    }

    console.log(`Texto limpio y organizado guardado en: ${outputFile}`);
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
  }
};

// Ejecuta el procesamiento
processFile();
