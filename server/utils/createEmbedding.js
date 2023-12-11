import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const createEmbedding = async (text) => {
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });

  const [{ embedding }] = embeddingResponse?.data
  
  return embedding
}

export {createEmbedding}