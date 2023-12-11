import File from "../models/File.js"
import mongodb from "mongodb"
import dotenv from 'dotenv';
dotenv.config();
async function handleUploadFiles(req, res) {
    try {
      if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files were uploaded.' })
          }
      const uploadedFiles = req.files
      const savedFiles = []
      for (const file of uploadedFiles) {
        const newFile = new File({
          filename: file.filename,
          originalName: file.originalname,
          contentType: file.mimetype,
          size: file.size,
        })
        const savedFile = await newFile.save()
        savedFiles.push(savedFile)
      }

      const allPdfs = await File.find({contentType: 'application/pdf'})

      if (!allPdfs) {
        res.status(400).json({message: 'Could not retrieve files.'})
      }

      console.log(allPdfs)
      res.send({ allPdfs })
      
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Internal server error.' })
    }
  }

async function handleUploadFile(req, res) {
  // Get the uploaded file
  const file = req.file;
  console.log(file)

  // Connect to MongoDB
  const MongoClient = mongodb.MongoClient;
  const client = await MongoClient.connect('http://localhost:5173');
  const db = client.db(process.env.MONGO_DB_URL);

  // Create a GridFS bucket
  const bucket = new mongodb.GridFSBucket(db, { bucketName: 'files' });
  console.log(bucket)

  // Upload the file to GridFS
  const uploadStream = await bucket.openUploadStream(file.originalname);
  await file.stream().pipe(uploadStream);

  console.log(uploadStream)
  
  // Close the upload stream
  await uploadStream.close();

  // Save the file ID to the database
  const fileId = uploadStream.id;

  // Close the database connection
  await client.close();

  // Respond to the request
  res.send({ success: true, fileId });
      
}

export { handleUploadFiles, handleUploadFile };
