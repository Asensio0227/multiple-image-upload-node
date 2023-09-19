const opt = {
  overwrite: true,
  invalidate: true,
  resource_type:'auto'
}

const file = (image) => {
  return new Promise((resolve, reject)=> {
    cloudinary.uploader.upload(image, opt, (err, result) => {
      if (result && result.secure_url) {
      console.log(result.secure_url);
      return resolve(result.secure_url)
      }
      console.log(error.message);
      return reject({message: error.message})
  })
  })
}

export const uploadImage = (images) => {
  return new Promise((resolve, reject) => {
    const uploads = images.map((base) => file(base))
    Promise.all(uploads)
      .then((values) => resolve(values))
      .catch((err) => reject(err))
  })
}