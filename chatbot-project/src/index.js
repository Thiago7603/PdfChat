const { trainAndSave, processInput } = require('./nlp');
const { queryPinecone } = require('./pinecone');

async function main() {
  await trainAndSave();

  const userInput = 'Tell me about Avatar';
  const nlpResponse = await processInput(userInput);

  if (nlpResponse.intent === 'greetings.hello') {
    console.log(nlpResponse.answer);
  } else {
    const pineconeResponse = await queryPinecone(nlpResponse.intent);
    console.log('Matches:', pineconeResponse.length);
    pineconeResponse.forEach((match, index) => {
      console.log(`Match ${index + 1}:`);
      console.log(`Title: ${match.metadata.title}`);
      console.log(`Year: ${match.metadata.year}`);
      console.log(`Genre: ${match.metadata.genre}`);
      console.log(`Summary: ${match.metadata.summary}`);
      console.log(`Box Office: ${match.metadata['box-office']}`);
      console.log('---');
    });
  }
}

main();
