const fs = require('fs');
const path = require('path');

// Ruta del archivo de entrada y salida
const inputFile = path.join(__dirname, './swebok-text.txt');
const outputFile = path.join(__dirname, './processed-swebok.txt');

// Leer el archivo desorganizado
const rawText = fs.readFileSync(inputFile, 'utf-8');

// Dividir el texto en líneas
const lines = rawText.split('\n');

// Palabras clave comunes para preguntas
const questionKeywords = ['What', 'How', 'Why', 'When', 'Which', 'Who', 'Define'];

// Variables para almacenar preguntas y respuestas
let currentQuestion = null;
const structuredData = [];

// Procesar línea por línea
lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return; // Saltar líneas vacías

    // Si la línea parece una pregunta, almacenar como pregunta actual
    if (questionKeywords.some((keyword) => trimmedLine.startsWith(keyword))) {
        if (currentQuestion) {
            structuredData.push(currentQuestion); // Guardar pregunta/respuesta previa
        }
        currentQuestion = { question: trimmedLine, answer: '' }; // Nueva pregunta
    } else if (currentQuestion) {
        // Agregar la línea como parte de la respuesta
        currentQuestion.answer += ` ${trimmedLine}`;
    }
});

// Agregar la última pregunta/respuesta si existe
if (currentQuestion) {
    structuredData.push(currentQuestion);
}

// Escribir las preguntas y respuestas en el archivo procesado
const processedText = structuredData
    .map((item) => `${item.question}\n${item.answer.trim()}\n`)
    .join('\n');

fs.writeFileSync(outputFile, processedText, 'utf-8');
console.log(`Texto procesado guardado en: ${outputFile}`);
