require('dotenv').config(); // Para cargar variables de entorno
const fs = require('fs'); // Operaciones del sistema de archivos
const pdf = require('pdf-parse'); // Análisis de PDF
const { HfInference } = require('@huggingface/inference'); // Inferencia de Hugging Face
const { Pinecone } = require('@pinecone-database/pinecone'); // Pinecone
const { v4: uuidv4 } = require('uuid'); // Generación de IDs únicos
const { NlpManager } = require('@nlpjs/core');

const hf = new HfInference(process.env.HF_API_KEY); // Clave de API de Hugging Face

/**
 * Lee un archivo PDF y extrae el texto.
 */
const readPDF = async (filePath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        return data.text;
    } catch (error) {
        console.error('Error al leer el PDF:', error);
        throw error;
    }
};

/**
 * Crea embeddings utilizando Hugging Face.
 */
const createEmbedding = async (texto) => {
    try {
        return await hf.featureExtraction({
            model: 'sentence-transformers/all-MiniLM-L6-v2',
            inputs: texto
        });
    } catch (error) {
        console.error('Error al crear el embedding:', error);
        throw error;
    }
};

/**
 * Guarda embeddings en Pinecone.
 */
const saveToPinecone = async (embedding, text) => {
    try {
        const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
        const index = pc.index('quickstart');
        const uniqueId = uuidv4();

        const upsertResponse = await index.upsert([
            {
                id: uniqueId,
                values: embedding,
                metadata: {
                    text: text
                }
            }
        ]);

        console.log('Embedding subido a Pinecone con ID:', uniqueId);
        return upsertResponse;
    } catch (error) {
        console.error('Error al guardar en Pinecone:', error);
        throw error;
    }
};

/**
 * Entrena el modelo NLP con el corpus.
 */
const trainNLP = async (corpus) => {
    const manager = new NlpManager({ languages: ['es'] });
    
    // Agregar documentos al manager
    corpus.forEach(({ text }) => {
        manager.addDocument('es', text, 'chatbot.response');
    });

    // Entrenar el modelo
    await manager.train();
    console.log('Modelo NLP entrenado.');
    return manager;
};

/**
 * Flujo principal del programa.
 */
(async () => {
    const pdfPath = './libro/swebok-v4.pdf'; // Ruta al archivo PDF
    const corpus = []; // Inicializa el corpus

    try {
        console.log('Procesando PDF...');
        const texto = await readPDF(pdfPath);
        console.log('Texto extraído:', texto.slice(0, 200), '...'); // Muestra solo los primeros 200 caracteres

        // Divide el texto en partes más pequeñas si es necesario
        const chunks = texto.split('\n'); // Divide por líneas o usa otra lógica

        for (const chunk of chunks) {
            const embedding = await createEmbedding(chunk);
            await saveToPinecone(embedding, chunk);
            corpus.push({ text: chunk }); // Agrega al corpus
        }

        console.log('Embeddings generados y guardados.');
        
        // Entrenar el modelo NLP
        const nlpManager = await trainNLP(corpus);
        
        console.log('Proceso completado con éxito.');
    } catch (error) {
        console.error('Error en el flujo principal:', error);
    }
})();