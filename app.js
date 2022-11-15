const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.get("/",function(req,res){
var a =6789;
  res.render('list', {kom: a});



})

app.listen(3000,function(req,res){
  console.log("The server is running at port 3000");
})
