const { Pinecone } = require('@pinecone-database/pinecone');
require('dotenv').config();

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});
const index = pc.index('movies-walkthrough');

async function queryPinecone(vector) {
  const response = await index.namespace('default').query({
    topK: 5,
    vector: vector,
    includeValues: true,
    includeMetadata: true
  });
  console.log(response);
  return response.matches;
}

module.exports = { queryPinecone };
