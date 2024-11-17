const { NlpManager } = require('node-nlp');

// Crear un administrador de NLP
const manager = new NlpManager({ languages: ['en'], forceNER: true });

// Agregar intenciones y respuestas
manager.addDocument('en', 'Hello', 'greet.hello');
manager.addDocument('en', 'Hi there', 'greet.hello');
manager.addDocument('en', 'Bye', 'greet.bye');
manager.addDocument('en', 'See you later', 'greet.bye');

manager.addAnswer('en', 'greet.hello', 'Hello! How can I help you?');
manager.addAnswer('en', 'greet.bye', 'Goodbye! Have a great day!');

// Entrenar y usar el modelo
(async () => {
  await manager.train();
  manager.save();
  const response = await manager.process('en', 'Hello');
  console.log(response.answer); // Debería imprimir "Hello! How can I help you?"
})();
