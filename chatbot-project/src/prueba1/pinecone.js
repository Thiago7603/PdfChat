const { Pinecone } = require('@pinecone-database/pinecone');
require('dotenv').config();

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});
const index = pc.index('movies-walkthrough');

async function queryPinecone(query) {
  const response = await pinecone.query({  
    vector: query,
    topK: 10,
    includeValues: true,
  });
  return response.matches;
}

module.exports = { queryPinecone };
