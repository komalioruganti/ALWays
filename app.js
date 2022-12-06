const express = require('express');
const bodyParser = require('body-parser');
const jsdom = require('jsdom');
const dom = new jsdom.JSDOM("");
const jquery = require('jquery')(dom.window);
const app = express();
const http = require('http');
const https = require('https');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

var article_search;

app.get("/calendar",function(req,res){
  res.render('calendar');
  
jquery(".day-content").click(function(){
  jquery('table.month td.day .day-content').css("color","purple");
})
  
})

app.get('/',function(req,res){
  res.render('landingPage');
  
 

})

app.get('/chatRoom',function(req,res){
  res.render('chatRoom');
});

io.on('connection', (socket) => {
  console.log("A user is connected");
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

app.get('/searchArticles',function(req,res){
res.render('search_articles');
})

app.post('/searchArticles',function(req,res){
article_search = req.body.searchInput;
res.redirect("/articles");

})
app.get('/articles',(req,res)=>{
  res.render('articles',{article_keyword : article_search })
})


server.listen(3000,function(req,res){
  console.log("The server is running at port 3000");
})
