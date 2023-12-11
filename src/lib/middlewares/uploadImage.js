//import multer from 'multer'
import path from 'path'
import { generateToken } from '../tokens.js'

//const storage = multer.diskStorage({
  //  destination: function(request, file, cb){
    //    cb(null, './src/public/img/uploads/')
    //},
   // filename:function(request, file, cb){
    //    cb(null,generateToken()+path.extname(
      //      file.originalname
        //    ))
   // }
//})  

const upload = 2//multer({
//    storage
//})

export default upload;