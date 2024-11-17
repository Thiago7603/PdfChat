// Importa las bibliotecas necesarias
const fs = require('fs'); // Para operaciones del sistema de archivos
const pdf = require('pdf-parse'); // Para analizar archivos PDF
const { HfInference } = require('@huggingface/inference'); // Para la inferencia de Hugging Face
const { Pinecone } = require('@pinecone-database/pinecone'); // Para la base de datos vectorial Pinecone
const { v4: uuidv4 } = require('uuid'); // Para generar IDs únicos

// Inicializa la inferencia de Hugging Face con tu clave API
const hf = new HfInference('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'); 

/**
 * Lee un archivo PDF y extrae el contenido de texto.
 * @param {string} filePath - La ruta al archivo PDF.
 * @returns {Promise<string>} - Una promesa que se resuelve con el texto extraído.
 */
const readPDF = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath); // Lee el archivo PDF en un buffer
    const data = await pdf(dataBuffer); // Analiza el buffer del PDF
    return data.text; // Devuelve el texto extraído
};

/**
 * Crea un embedding para el texto dado utilizando el modelo especificado.
 * @param {string} texto - El texto para el que se creará un embedding.
 * @returns {Promise<Array<number>>} - Una promesa que se resuelve con el vector de embedding.
 */
const createEmbedding = async (texto) => {
    try {
        const response = await hf.featureExtraction({
            model: 'sentence-transformers/all-MiniLM-L6-v2', // Especifica el modelo a utilizar
            inputs: texto // Texto de entrada para la generación del embedding
        });
        return response; // Devuelve el embedding generado
    } catch (error) {
        console.error('Error al crear el embedding:', error); // Registra cualquier error durante la creación del embedding
    }
};

/**
 * Guarda el embedding en Pinecone con un ID único.
 * @param {Array<number>} embedding - El vector de embedding a guardar.
 */
const saveToPinecone = async (embedding) => {
    // Inicializa Pinecone con tu clave API
    const pc = new Pinecone({
        apiKey: 'pcsk_69o5Te_7pPbma15Usuhd11itQXEyWHSLciW7hTQuFXDZuNrrimS7FeKMSmMbyyWEKYGPdp' 
    });

    const index = pc.index('quickstart'); // Conéctate al índice 'quickstart'

    const uniqueId = uuidv4(); // Genera un ID único para el embedding

    // Inserta o actualiza el embedding en Pinecone
    const upsertResponse = await index.upsert([
        {
            id: uniqueId, // Usa el ID único generado
            values: embedding // El vector de embedding
        }
    ]);
    
    console.log('Embedding subido a Pinecone con ID:', uniqueId, 'Respuesta:', upsertResponse); // Registra el estado de la subida
};

// Especifica la ruta al archivo PDF
const pdfPath = 'libro/swebok-v4.pdf'; 

// Procesa el PDF: lee, crea el embedding y guárdalo en Pinecone
readPDF(pdfPath).then(async (texto) => {
    console.log('Texto extraído del PDF:', texto); // Registra el texto extraído
    const embedding = await createEmbedding(texto); // Crea el embedding
    console.log('Embedding creado:', embedding); // Registra el embedding creado
    if (embedding) {
        await saveToPinecone(embedding); // Guarda el embedding en Pinecone
    }
});