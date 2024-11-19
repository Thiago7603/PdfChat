const fs = require('fs');

// Función para cargar y procesar texto del archivo
const loadIntentsFromFile = (manager, filePath) => {
    const text = fs.readFileSync(filePath, 'utf-8');
    const sections = text.split('\n\n'); // Separar por secciones

    sections.forEach((section, index) => {
        const lines = section.split('\n');
        const intent = `swebok.section.${index}`;
        const question = lines[0];
        const answer = lines.slice(1).join(' ');

        manager.addDocument('en', question, intent);
        manager.addAnswer('en', intent, answer);
    });
};

module.exports = { loadIntentsFromFile };
