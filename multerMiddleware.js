import multer from "multer"

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname + '-' + Date.now().toString())
  },
})

// const storage = multer.memoryStorage()
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null,true)
  } else {
    cb({
      msg:"Unsupported file format"
    },false)
  }
}

const upload = multer({
  storage: storage,
  limits:{fileSize:1024*1024},
  fileFilter:fileFilter
})

export default upload;