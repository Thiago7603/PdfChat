const { NlpManager } = require('node-nlp');
const readline = require('readline');

// Crear el lector de la línea de comandos
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Crear el manager de NLP
const manager = new NlpManager({ languages: ['en'] });

// Cargar el modelo entrenado
(async () => {
    try {
        console.log('Cargando el modelo...');
        await manager.load('./models/model.nlp');
        console.log('Chatbot listo. Escribe algo para interactuar:');

        // Manejar la interacción del usuario
        rl.on('line', async (input) => {
            if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
                console.log('¡Adiós!');
                rl.close();
                return;
            }

            // Procesar la entrada del usuario
            const response = await manager.process('en', input);
            if (response.intent === 'None') {
                console.log('Bot: Lo siento, no entendí tu pregunta.');
            } else {
                console.log(`Bot: ${response.answer}`);
            }
        });
    } catch (error) {
        console.error('Error al cargar el modelo:', error);
    }
})();
