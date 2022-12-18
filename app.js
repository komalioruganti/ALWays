const express = require('express');
const bodyParser = require('body-parser');
const jsdom = require('jsdom');
const dom = new jsdom.JSDOM("");
const jquery = require('jquery')(dom.window);
const app = express();
const http = require('http');
const https = require('https');
const server = http.createServer(app);
const { MongoClient } = require("mongodb");
const { Server } = require("socket.io");
const io = new Server(server);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const uri =
  "mongodb+srv://netTheCoder:welcome123@cluster0.ra2eh5p.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

app.use(bodyParser.urlencoded({ extended: true }));
var eventItems = [];
var article_search;
var eventsObj = {};
var resultArr = [];
var inputEvent,
  inputDate;


app.get("/signUp", function (req, res) {
  res.render('signUp')
})

app.get("/calendar", function (req, res) {
  console.log(inputDate);
  res.render('calendar', { newListItem: eventItems, resultArr, eventDate: inputDate });

})

app.post("/calendar", function (req, res) {
  inputEvent = req.body.eventInput;
  console.log(inputEvent);
  inputDate = req.body.eventDate;
  eventsObj = {
    date: inputDate,
    description: inputEvent
  }
  if (inputEvent !== "") {
    AddEvents().catch(console.dir);
    eventItems.push(inputEvent);
  }




  res.redirect("/calendar");
})

async function AddEvents() {
  try {
    const database = client.db('SampleDatabase');
    const names = database.collection('n');
    const addedItem = await names.insertOne(eventsObj);
  }

  finally {
    //   // Ensures that the client will close when you finish/error
    //   await client.close();
  }
}

async function main() {
  const MongoClient = require('mongodb').MongoClient;
  const uri =
    'mongodb+srv://netTheCoder:welcome123@cluster0.ra2eh5p.mongodb.net/?retryWrites=true&w=majority'

  const client = new MongoClient(uri, { useNewUrlParser: true });

  // Connect to the client and query
  await client.connect();
  findListings(client, 5);

}

main().catch(console.error);

async function findListings(client, resultsLimit) {
  const cursor = client
    .db('Calendar')
    .collection('Events')
    .find()
    .limit(resultsLimit);

  const results = await cursor.toArray();
  if (results.length > 0) {
    console.log(`Found ${results.length} Events(s):`);
    results.forEach((result, i) => {
      resultArr.push(result);
      console.log(result);
      date = new Date(result.last_review).toDateString();



    });
  }
}


app.get('/', function (req, res) {
  const date = new Date();
  res.render('landingPage', { today: date.toDateString() });


})

app.get('/chatRoom', function (req, res) {
  res.render('chatRoom');
});

io.on('connection', (socket) => {
  console.log("A user is connected");
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

app.get('/searchArticles', function (req, res) {
  res.render('search_articles');
})

app.post('/searchArticles', function (req, res) {
  article_search = req.body.searchInput;
  res.redirect("/articles");

})
app.get('/articles', (req, res) => {
  res.render('articles', { article_keyword: article_search })
})


server.listen(3000, function (req, res) {
  console.log("The server is running at port 3000");
})
