const { NlpManager } = require('node-nlp');
const fs = require('fs');
const path = require('path');

// Ruta al archivo de texto
const filePath = path.join(__dirname, './swebok-text.txt');

// Cargar el contenido del archivo
const bookText = fs.readFileSync(filePath, 'utf-8');

// Crear un gestor de NLP
const manager = new NlpManager({ languages: ['en'] });

console.log('Entrenando el modelo...');

// Dividir el contenido en secciones basadas en líneas vacías
const sections = bookText.split('\n\n');

sections.forEach((section, index) => {
    const lines = section.split('\n').filter(line => line.trim() !== ''); // Filtra líneas vacías
    if (lines.length >= 2) {
        const intent = `swebok.section.${index}`;
        const question = lines[0]; // Primera línea es la pregunta
        const answer = lines.slice(1).join(' '); // Resto de líneas son la respuesta

        // Añadir documentos y respuestas
        manager.addDocument('en', question, intent);
        manager.addAnswer('en', intent, answer);
    } else {
        console.warn(`Se ignoró una sección incompleta: ${section}`);
    }
});

// Entrenar y guardar el modelo
(async () => {
    await manager.train();
    manager.save('./models/model.nlp');
    console.log('Modelo entrenado y guardado en ./models/model.nlp');
})();
