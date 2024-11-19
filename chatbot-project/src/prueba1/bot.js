const { NlpManager } = require('node-nlp');
const fs = require('fs');

// Cargar el texto extraído
const bookText = fs.readFileSync('swebok-text.txt', 'utf-8');

// Crear un manager de NLP
const manager = new NlpManager({ languages: ['en'] });

// Agregar documentos y respuestas basadas en el contenido del libro
// Aquí puedes personalizar los intents y respuestas según el contenido
manager.addDocument('en', 'What is software engineering?', 'software.engineering');
manager.addAnswer('en', 'software.engineering', 'Software engineering is the application of engineering to the development of software in a systematic method.');

manager.addDocument('en', 'What is software design?', 'software.design');
manager.addAnswer('en', 'software.design', 'Software design is the process of defining the architecture, components, interfaces, and other characteristics of a system or component.');

manager.addDocument('en', 'What is software testing?', 'software.testing');
manager.addAnswer('en', 'software.testing', 'Software testing is the process of evaluating a system or its components with the intent to find whether it satisfies the specified requirements or to identify defects.');

manager.addDocument('en', 'What is software maintenance?', 'software.maintenance');
manager.addAnswer('en', 'software.maintenance', 'Software maintenance is the modification of a software product after delivery to correct faults, improve performance or other attributes, or adapt to a changed environment.');

manager.addDocument('en', 'What is software configuration management?', 'software.configuration.management');
manager.addAnswer('en', 'software.configuration.management', 'Software configuration management is the process of identifying and defining the items in the system, controlling the changes of these items throughout their lifecycle, and recording and reporting the status of these items and change requests.');

// Entrenar el modelo
const train = async () => {
    await manager.train();
    manager.save();
};

// Procesar la entrada del usuario
const processInput = async (input) => {
    const response = await manager.process('en', input);
    console.log(`Bot: ${response.answer}`);
};

// Inicializar el bot
const startBot = async () => {
    await train();
    console.log('Chatbot listo. Escribe algo para comenzar a chatear:');
    process.stdin.on('data', (data) => {
        const userInput = data.toString().trim();
        processInput(userInput);
    });
};

startBot();