
import UploadedDocument from '../models/DocumentUpload.js'
import { createEmbedding } from '../utils/createEmbedding.js'
import { hitOpenAiApi } from "../utils/hitOpenAiApi.js"

const collection = UploadedDocument.collection

const handleEmbedding = async (req, res) => {
    try {
        //create embedding with openAi 
        const { text } = req.body
        const embedding = await createEmbedding(text)
        const newDoc = new UploadedDocument({
            description: text,
            embedding: embedding
        })

        //store embedding in mongoDb
        const savedDoc = await newDoc.save()
        res.status(201).json({
            message: 'Document uploaded successfully',
            document: savedDoc
        })
    } catch (err) {
        console.log('err: ', err)
        res.status(500).json({
            error: 'Internal server error',
            message: err.message,
        })
    }
};

const handleQueryEmbedding = async (req, res) => {
    try {
        const { query } = req.body
        const embedding = await createEmbedding(query)
        
        async function findSimilarDocuments(embedding) {
            try {
              // Query for similar documents.
              const documents = await collection
                .aggregate([
                  {
                    $search: {
                      knnBeta: {
                        vector: embedding,
                        // path is the path to the embedding field in the mongodb collection documentupload
                        path: 'embedding',
                        // change k to the number of documents you want to be returned
                        k: 5,
                      },
                    },
                  },
                  {
                    $project: {
                      description: 1,
                      score: { $meta: 'searchScore' },
                    },
                  },
                ])
                .toArray()
      
              return documents
            } catch (err) {
              console.error(err)
            }
          }

          const similarDocuments = await findSimilarDocuments(embedding)

          console.log('similarDocuments: ', similarDocuments)

        // gets the document with the highest score
            const highestScoreDoc = similarDocuments.reduce((highest, current) => {
                return highest.score > current.score ? highest : current
            })

            console.log('highestScoreDoc', highestScoreDoc)

            const prompt = `Based on this context: ${highestScoreDoc.description} \n\n Query: ${query} \n\n Answer:`

            const answer = await hitOpenAiApi(prompt)

            console.log('answer: ', answer)
            res.send(answer)
    } catch(err) {
        res.status(500).json({
            error: 'Internal server error',
            message: err.message,
        })
    }
}

export { handleEmbedding, handleQueryEmbedding }
