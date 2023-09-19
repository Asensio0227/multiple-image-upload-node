import { uploadImage } from "./file-clodunary"

app.post('/ip', (req, res) => {
  uploadImage(req.body.images).then((urls)=>res.send(urls)).catch((err)=>res.status(500).send(err))
})