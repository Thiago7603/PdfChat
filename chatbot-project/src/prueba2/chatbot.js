const { NlpManager } = require('node-nlp');
const path = require('path');

// Crear un gestor de NLP
const manager = new NlpManager({ languages: ['en'] });

console.log('Cargando el modelo...');
manager.load(path.join(__dirname, '../models/model.nlp'));

console.log('Chatbot listo. Escribe algo para interactuar:');

// Procesar la entrada del usuario
const processInput = async (input) => {
    const response = await manager.process('en', input);
    if (response.answer) {
        console.log(`Bot: ${response.answer}`);
    } else {
        console.log('Bot: Lo siento, no entendí tu pregunta.');
    }
};

// Leer entrada del usuario desde la consola
process.stdin.on('data', (data) => {
    const userInput = data.toString().trim();
    processInput(userInput);
});
