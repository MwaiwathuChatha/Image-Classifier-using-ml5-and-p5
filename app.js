const express = require('express');
const bodyParser=require('body-parser');
const port = 3000;
const path= require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"))
/*app.get('/',(req,res)=>{
  res.render('index');
})*/

const multer=require("multer");
const storage=multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'public')
  },

filename:(req, file,cb)=>{
  console.log(file);
  cb(null,'image'+path.extname(file.originalname))
}

})

const upload=multer({storage: storage});



app.post("/",upload.single("image"),(req,res,next)=>{
  res.send("image uploaded!");
  next();
})

const useRouter=require('./routes/users');
app.use('/users',useRouter);
app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});