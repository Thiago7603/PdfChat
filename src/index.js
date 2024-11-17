const fs = require('fs');
const pdf = require('pdf-parse');
const { HfInference } = require('@huggingface/inference');
const { Pinecone } = require('@pinecone-database/pinecone');

const hf = new HfInference('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'); 

const readPDF = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
};

const createEmbedding = async (text) => {
    try {
        const response = await hf.featureExtraction({
            model: 'sentence-transformers/all-MiniLM-L6-v2',
            inputs: text
        });
        return response; 
    } catch (error) {
        console.error('Error al crear embedding:', error);
    }
};

const saveToPinecone = async (embedding) => {
    const pc = new Pinecone({
        apiKey: 'pcsk_69o5Te_7pPbma15Usuhd11itQXEyWHSLciW7hTQuFXDZuNrrimS7FeKMSmMbyyWEKYGPdp'
    });

    const index = pc.index('quickstart'); 

    const upsertResponse = await index.upsert([
        {
            id: '1', // Cambia esto por un ID único para cada documento
            values: embedding
        }
    ]);
    
    console.log('Embedding subido a Pinecone:', upsertResponse);
};

const pdfPath = 'libro/swebok-v4.pdf';
readPDF(pdfPath).then(async (text) => {
    console.log('Texto extraído del PDF:', text);
    const embedding = await createEmbedding(text);
    console.log('Embedding creado:', embedding);
    if (embedding) {
        await saveToPinecone(embedding);
    }
});
