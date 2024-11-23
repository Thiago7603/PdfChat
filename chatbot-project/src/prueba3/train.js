const fs = require('fs');
const { NlpManager } = require('node-nlp');

// Ruta del archivo organizado
const filePath = './src/swebok-organized.txt';

// Leer y cargar el contenido del archivo
let content;
try {
    content = fs.readFileSync(filePath, 'utf-8');
} catch (error) {
    console.error('Error al leer el archivo:', error);
    process.exit(1);
}

// Crear el manager de NLP
const manager = new NlpManager({ languages: ['en'], forceNER: true });

// Procesar el contenido del archivo
const sections = content.split('\n\n'); // Cambia el delimitador si usaste otro
console.log(`Se encontraron ${sections.length} secciones en el archivo.`);

// Agregar intenciones y respuestas
sections.forEach((section, index) => {
    const lines = section.split('\n');
    const title = lines[0]?.trim(); // Primera línea como título o encabezado
    const description = lines.slice(1).join(' ').trim(); // El resto como contenido

    if (title && description) {
        const intent = `swebok.section.${index}`;
        manager.addDocument('en', `Tell me about ${title}`, intent);
        manager.addDocument('en', `What is ${title}?`, intent);
        manager.addAnswer('en', intent, description);
    }
});

// Agregar intenciones generales
manager.addDocument('en', 'What is software engineering?', 'general.software_engineering');
manager.addAnswer(
    'en',
    'general.software_engineering',
    'Software engineering is the application of engineering principles to software development.'
);

manager.addDocument('en', 'What is this chatbot about?', 'general.about');
manager.addAnswer(
    'en',
    'general.about',
    'I am a chatbot trained to discuss topics from the SWEBOK (Software Engineering Body of Knowledge).'
);

// Entrenar el modelo
const train = async () => {
    console.log('Entrenando el modelo...');
    await manager.train();
    manager.save();
    console.log('Modelo entrenado y guardado.');
};

train();
