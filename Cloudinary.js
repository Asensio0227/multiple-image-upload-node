import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
  cloud_name: `dv2liy3u7`,
  api_key: `383238981471399`,
  api_secret: `wtxknLAyyXC08YDCVwk58w4b4Rc`,
  secure: true,
})


const uploads3 = (file, folder) => {
  return async (resolve) => {
    try {
      const response = await cloudinary.uploader.upload(file, (result) => {
        resolve({
          url: result.secure_url,
          id:result.public_id
        })
      }, {
        resource_type: 'auto',
        folder:folder
      })
      console.log(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}

 const uploads = (file, folder) => {
   return new Promise((resolve,reject) => {
       
     try {
     cloudinary.uploader.upload(file, {
       overwrite: true,
  invalidate: true,
        resource_type: 'auto',
        folder:folder
},(error,result) => {
        if (result && result.secure_url) {
           
          resolve({
            url: result.secure_url,
            thumbnailUrl:result.url,
            id:result.public_id
          })
        }
      return reject({message: error})
       })
      } catch (error) {
        console.log(error);
      }
     
    
  })
 }


 export default uploads