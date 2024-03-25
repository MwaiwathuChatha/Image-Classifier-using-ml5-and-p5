const express = require('express');
const bodyParser=require('body-parser');
const port = 3000;
const path= require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,"public")));
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname+'/index.html'));
})

const multer=require("multer");
const storage=multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'public')
  },filename:(req, file,cb)=>{
  console.log(file);
  cb(null,'image'+path.extname(file.originalname))
}})
const upload=multer({storage: storage});
app.post("/",upload.single("image"),(req,res)=>{
  res.sendFile(path.join(__dirname+'/secondPage/verification.html'))
})

const nextpage= function(req,res,next){

  next();
}

const routeInnit = express.Router(); 
routeInnit.route('/image').get((req,res)=>{
  res.sendFile(path.join(__dirname+'/secondPage/verification.html'))
  })
app.use('/classify',routeInnit);
app.use(nextpage);



app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});