const { NlpManager } = require('node-nlp');
const { Pinecone } = require('@pinecone-database/pinecone');
const readline = require('readline');

// Inicializa Pinecone
const pc = new Pinecone({
    apiKey: 'pcsk_69o5Te_7pPbma15Usuhd11itQXEyWHSLciW7hTQuFXDZuNrrimS7FeKMSmMbyyWEKYGPdp'
});

// Inicializa el manager de NLP
const manager = new NlpManager({ languages: ['es'], forceNER: true });

// Función para recuperar embeddings desde Pinecone
const getEmbeddingFromPinecone = async () => {
    const index = pc.index('quickstart');
    const queryResponse = await index.query({
        vector: [], // Aquí deberías proporcionar un embedding de consulta
        topK: 5, // Número de resultados a recuperar
    });
    return queryResponse.matches; // Devuelve los embeddings recuperados
};

// Función para entrenar el modelo NLP.js
// Función para entrenar el modelo NLP.js
const trainNlpManager = async () => {
    // Añadiendo preguntas y respuestas
    manager.addDocument('es', '¿Cuál es el objetivo del libro?', 'book.goal');
    manager.addAnswer('es', 'book.goal', 'El objetivo del libro es proporcionar un marco de referencia para el desarrollo de software.');

    manager.addDocument('es', '¿De qué trata el libro?', 'book.content');
    manager.addAnswer('es', 'book.content', 'El libro trata sobre las mejores prácticas en el desarrollo de software y los estándares de la industria.');

    manager.addDocument('es', '¿Qué es el SWEBOK?', 'book.swebok');
    manager.addAnswer('es', 'book.swebok', 'El SWEBOK es un conjunto de conocimientos que define las disciplinas y prácticas en el campo de la ingeniería de software.');

    manager.addDocument('es', '¿Cuáles son las áreas de conocimiento en ingeniería de software?', 'book.areas');
    manager.addAnswer('es', 'book.areas', 'Las áreas incluyen requisitos, diseño, construcción, pruebas, mantenimiento, gestión de proyectos y calidad.');

    manager.addDocument('es', '¿Por qué es importante la gestión de requisitos?', 'book.gestion_requisitos');
    manager.addAnswer('es', 'book.gestion_requisitos', 'La gestión de requisitos es crucial para asegurar que el software cumpla con las necesidades del cliente y los usuarios finales.');

    manager.addDocument('es', '¿Qué es el diseño de software?', 'book.diseño');
    manager.addAnswer('es', 'book.diseño', 'El diseño de software es el proceso de definir la arquitectura, componentes y interfaces de un sistema.');

    manager.addDocument('es', '¿Cuál es la diferencia entre pruebas funcionales y no funcionales?', 'book.pruebas');
    manager.addAnswer('es', 'book.pruebas', 'Las pruebas funcionales verifican que el software cumpla con los requisitos, mientras que las pruebas no funcionales evalúan el rendimiento y la usabilidad.');

    manager.addDocument('es', '¿Qué es el mantenimiento de software?', 'book.mantenimiento');
    manager.addAnswer('es', 'book.mantenimiento', 'El mantenimiento de software implica corregir errores, mejorar el rendimiento y adaptar el software a nuevos entornos.');

    manager.addDocument('es', '¿Qué es la calidad del software?', 'book.calidad');
    manager.addAnswer('es', 'book.calidad', 'La calidad del software se refiere a la capacidad del software para satisfacer las expectativas y requisitos del cliente.');

    manager.addDocument('es', '¿Qué metodologías de desarrollo de software se mencionan en el libro?', 'book.metodologias');
    manager.addAnswer('es', 'book.metodologias', 'Se mencionan metodologías como Agile, Scrum, Waterfall y DevOps.');

    manager.addDocument('es', '¿Qué es la ingeniería de requisitos?', 'book.ingenieria_requisitos');
    manager.addAnswer('es', 'book.ingenieria_requisitos', 'La ingeniería de requisitos es el proceso de recopilar, documentar y gestionar los requisitos del software.');

    manager.addDocument('es', '¿Cómo se realiza la gestión de proyectos en software?', 'book.gestion_proyectos');
    manager.addAnswer('es', 'book.gestion_proyectos', 'La gestión de proyectos implica planificar, ejecutar y supervisar el desarrollo del software para cumplir con los objetivos.');

    manager.addDocument('es', '¿Qué es la arquitectura de software?', 'book.arquitectura');
    manager.addAnswer('es', 'book.arquitectura', 'La arquitectura de software es la estructura general del sistema, que define cómo interactúan sus componentes.');

    manager.addDocument('es', '¿Qué es el desarrollo ágil?', 'book.desarrollo_agil');
    manager.addAnswer('es', 'book.desarrollo_agil', 'El desarrollo ágil es un enfoque iterativo y colaborativo para el desarrollo de software que se centra en la flexibilidad y la entrega rápida.');

    manager.addDocument('es', '¿Qué son las pruebas unitarias?', 'book.pruebas_unitarias');
    manager.addAnswer('es', 'book.pruebas_unitarias', 'Las pruebas unitarias son pruebas que verifican el funcionamiento de componentes individuales del software.');

    manager.addDocument('es', '¿Qué es la gestión de riesgos en proyectos de software?', 'book.gestion_riesgos');
    manager.addAnswer('es', 'book.gestion_riesgos', 'La gestión de riesgos implica identificar, evaluar y mitigar riesgos que pueden afectar el éxito del proyecto.');

    manager.addDocument('es', '¿Qué es la documentación en el desarrollo de software?', 'book.documentacion');
    manager.addAnswer('es', 'book.documentacion', 'La documentación es el proceso de crear registros que describen el diseño, uso y mantenimiento del software.');

    manager.addDocument('es', '¿Qué herramientas se utilizan para la gestión de proyectos?', 'book.herramientas_gestion');
    manager.addAnswer('es', 'book.herramientas_gestion', 'Se utilizan herramientas como Jira, Trello, Asana y Microsoft Project.');

    manager.addDocument('es', '¿Qué es la integración continua?', 'book.integracion_continua');
    manager.addAnswer('es', 'book.integracion_continua', 'La integración continua es una práctica de desarrollo que implica fusionar cambios de código en un repositorio compartido varias veces al día.');

    manager.addDocument('es', '¿Qué es la entrega continua?', 'book.entrega_continua');
    manager.addAnswer('es', 'book.entrega_continua', 'La entrega continua es una práctica que permite liberar software de forma rápida y confiable mediante automatización.');

    manager.addDocument('es', '¿Cuáles son los principios de diseño de software?', 'book.principios_diseño');
    manager.addAnswer('es', 'book.principios_diseño', 'Los principios incluyen la modularidad, la reutilización y la separación de preocupaciones.');

    manager.addDocument('es', '¿Qué es el control de versiones?', 'book.control_versiones');
    manager.addAnswer('es', 'book.control_versiones', 'El control de versiones es el proceso de gestionar cambios en el código fuente y otros documentos.');

    manager.addDocument('es', '¿Qué es un ciclo de vida de desarrollo de software?', 'book.ciclo_vida');
    manager.addAnswer('es', 'book.ciclo_vida', 'Es el proceso que describe las etapas desde la concepción hasta la entrega y mantenimiento del software.');

    manager.addDocument('es', '¿Qué es la usabilidad en el software?', 'book.usabilidad');
    manager.addAnswer('es', 'book.usabilidad', 'La usabilidad se refiere a la facilidad con la que los usuarios pueden interactuar con el software y cumplir sus objetivos.');

    manager.addDocument('es', '¿Qué es el testing de regresión?', 'book.testing_regresion');
    manager.addAnswer('es', 'book.testing_regresion', 'El testing de regresión es el proceso de volver a probar el software después de realizar cambios para asegurarse de que no se hayan introducido nuevos errores.');

    manager.addDocument('es', '¿Qué es un caso de uso?', 'book.caso_uso');
    manager.addAnswer('es', 'book.caso_uso', 'Un caso de uso es una descripción de cómo un usuario interactúa con el sistema para lograr un objetivo específico.');

    manager.addDocument('es', '¿Qué es la programación orientada a objetos?', 'book.programacion_orientada_objetos');
    manager.addAnswer('es', 'book.programacion_orientada_objetos', 'La programación orientada a objetos es un paradigma de programación que utiliza "objetos" para representar datos y métodos.');

    manager.addDocument('es', '¿Qué es un prototipo en el desarrollo de software?', 'book.prototipo');
    manager.addAnswer('es', 'book.prototipo', 'Un prototipo es una versión preliminar del software que se utiliza para visualizar y probar conceptos antes del desarrollo completo.');

    manager.addDocument('es', '¿Qué es la revisión de código?', 'book.revision_codigo');
    manager.addAnswer('es', 'book.revision_codigo', 'La revisión de código es el proceso de examinar el código fuente para identificar errores y mejorar la calidad.');

    manager.addDocument('es', '¿Qué es el análisis de impacto?', 'book.analisis_impacto');
    manager.addAnswer('es', 'book.analisis_impacto', 'El análisis de impacto evalúa las consecuencias de un cambio propuesto en el software.');

    manager.addDocument('es', '¿Qué son las métricas de software?', 'book.metricas');
    manager.addAnswer('es', 'book.metricas', 'Las métricas de software son medidas utilizadas para evaluar la calidad, el rendimiento y la eficiencia del software.');

    manager.addDocument('es', '¿Qué es la arquitectura de microservicios?', 'book.microservicios');
    manager.addAnswer('es', 'book.microservicios', 'La arquitectura de microservicios es un enfoque de diseño que divide una aplicación en servicios pequeños e independientes.');

    manager.addDocument('es', '¿Qué es el desarrollo basado en pruebas (TDD)?', 'book.tdd');
    manager.addAnswer ('es', 'book.tdd', 'El desarrollo basado en pruebas es una práctica que implica escribir pruebas antes de desarrollar el código.');

    manager.addDocument('es', '¿Qué es la gestión del cambio?', 'book.gestion_cambio');
    manager.addAnswer('es', 'book.gestion_cambio', 'La gestión del cambio es el proceso de controlar y documentar cambios en el software y su entorno.');

    manager.addDocument('es', '¿Qué es un sistema de gestión de bases de datos (DBMS)?', 'book.dbms');
    manager.addAnswer('es', 'book.dbms', 'Un DBMS es un software que permite crear, gestionar y manipular bases de datos.');

    manager.addDocument('es', '¿Qué es la seguridad en el desarrollo de software?', 'book.seguridad');
    manager.addAnswer('es', 'book.seguridad', 'La seguridad se refiere a las prácticas y medidas implementadas para proteger el software contra amenazas y vulnerabilidades.');

    manager.addDocument('es', '¿Qué es la arquitectura de software en capas?', 'book.arquitectura_capas');
    manager.addAnswer('es', 'book.arquitectura_capas', 'La arquitectura en capas organiza el software en diferentes niveles, cada uno con responsabilidades específicas.');

    manager.addDocument('es', '¿Qué es el análisis de requisitos?', 'book.analisis_requisitos');
    manager.addAnswer('es', 'book.analisis_requisitos', 'El análisis de requisitos es el proceso de identificar y documentar las necesidades y expectativas de los usuarios.');

    manager.addDocument('es', '¿Qué es un entorno de desarrollo integrado (IDE)?', 'book.ide');
    manager.addAnswer('es', 'book.ide', 'Un IDE es una aplicación que proporciona herramientas para el desarrollo de software, como editores de código, depuradores y compiladores.');

    manager.addDocument('es', '¿Qué es la programación funcional?', 'book.programacion_funcional');
    manager.addAnswer('es', 'book.programacion_funcional', 'La programación funcional es un paradigma que trata la computación como la evaluación de funciones matemáticas y evita el estado mutable.');

    manager.addDocument('es', '¿Qué es el diseño centrado en el usuario?', 'book.diseño_centrado_usuario');
    manager.addAnswer('es', 'book.diseño_centrado_usuario', 'El diseño centrado en el usuario es un enfoque que prioriza las necesidades y experiencias del usuario en el desarrollo de software.');

    manager.addDocument('es', '¿Qué es un diagrama de flujo?', 'book.diagrama_flujo');
    manager.addAnswer('es', 'book.diagrama_flujo', 'Un diagrama de flujo es una representación gráfica de un proceso o algoritmo.');

    manager.addDocument('es', '¿Qué es la integración de sistemas?', 'book.integracion_sistemas');
    manager.addAnswer('es', 'book.integracion_sistemas', 'La integración de sistemas es el proceso de combinar diferentes sistemas y software para trabajar juntos.');

    manager.addDocument('es', '¿Qué es un API?', 'book.api');
    manager.addAnswer('es', 'book.api', 'Un API (Interfaz de Programación de Aplicaciones) es un conjunto de reglas y protocolos que permite que diferentes aplicaciones se comuniquen entre sí.');

    manager.addDocument('es', '¿Qué es el desarrollo de software ágil?', 'book.desarrollo_agil');
    manager.addAnswer('es', 'book.desarrollo_agil', 'El desarrollo ágil es un enfoque que promueve la colaboración, la flexibilidad y la entrega continua de software.');

    manager.addDocument('es', '¿Qué es un backlog en Scrum?', 'book.backlog');
    manager.addAnswer('es', 'book.backlog', 'Un backlog es una lista priorizada de tareas y requisitos que deben completarse en un proyecto Scrum.');

    manager.addDocument('es', '¿Qué es un sprint en Scrum?', 'book.sprint');
    manager.addAnswer('es', 'book.sprint', 'Un sprint es un período de tiempo fijo durante el cual se completa un conjunto específico de tareas del backlog.');

    manager.addDocument('es', '¿Qué es la refactorización de código?', 'book.refactorizacion');
    manager.addAnswer('es', 'book.refactorizacion', 'La refactorización de código es el proceso de modificar el código existente para mejorar su estructura y legibilidad sin cambiar su funcionalidad.');

    manager.addDocument('es', '¿Qué son las pruebas de aceptación?', 'book.pruebas_aceptacion');
    manager.addAnswer('es', 'book.pruebas_aceptacion', 'Las pruebas de aceptación son pruebas realizadas para determinar si el software cumple con los criterios de aceptación establecidos por el cliente.');

    manager.addDocument(' es', '¿Qué es el ciclo de vida de desarrollo ágil?', 'book.ciclo_vida_agil');
    manager.addAnswer('es', 'book.ciclo_vida_agil', 'El ciclo de vida de desarrollo ágil es un enfoque iterativo que incluye fases de planificación, desarrollo, pruebas y revisión, permitiendo adaptaciones rápidas a los cambios.');
    await manager.train();
    manager.save();
};

// Función para manejar la interacción del usuario
const handleUserInput = async (userInput) => {
    const response = await manager.process('es', userInput);
    console.log('Respuesta del bot:', response.answer || 'Lo siento, no tengo información sobre eso.');
};

// Configuración de readline para entrada del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para iniciar la conversación
const startConversation = () => {
    rl.question('¿Cuál es tu pregunta? ', async (userInput) => {
        await handleUserInput(userInput);
        startConversation(); // Vuelve a preguntar después de responder
    });
};

// Entrena el modelo y luego inicia la conversación
trainNlpManager().then(() => {
    console.log('Modelo entrenado. Puedes hacer preguntas:');
    startConversation();
});