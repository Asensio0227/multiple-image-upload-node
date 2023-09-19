import fs from 'fs'
import path, { dirname } from 'path'
import bodyParser from 'body-parser'
import express from 'express'
import upload from './multerMiddleware.js'
import uploads from './Cloudinary.js'
import {nanoid} from 'nanoid'

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.use(
  '/uploads',
  upload.array('image', 3),
  async (req, res) => {
    const uploader = async (path) => await uploads(path, 'file-upload')
    if (req.method === 'POST') {
      
      const urls = []
      const files = req.files;
      
      for (const file of files) {
        const { path } = file
        // const newPath = {
        //   url: path,
        //   id:nanoid()
          
        // }
        const newPath = await uploader(path)
        urls.push(newPath)
        fs.unlinkSync(path)
      }
      res.status(200).json({
        msg: "images uploaded successfully",
        data: urls
      })
    }else{
res.status(405).json({msg:'images not uploaded successfully'})
    }
  }
)

app.get('/', function (req, res) {
  res.json({ message: 'WELCOME' })
})


try {

  app.listen(3000, () => console.log('Server started on port 3000'))
} catch (error) {
  console.log(error)
  process.exit(1)
}
