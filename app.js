const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const https = require('https');
const { MongoClient } = require("mongodb");
const server = http.createServer(app);
const io = require('socket.io')(server);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const {userJoin,getCurrentUser } = require('./utils/users')

require("dotenv").config();

const uri = process.env.MONGODB_URI
const apikey = process.env.MEDIASTACK_API_KEY

const client = new MongoClient(uri, { useNewUrlParser: true });
const database = client.db('SampleDatabase');
const collection = database.collection('n');


app.use(bodyParser.urlencoded({ extended: true }));

var article_search;
var eventsObj = {};

var username;

app.get('/', (req, res) => {
  res.render('login');
})

app.post('/', (req, res) => {
  username = req.body.username;
  password = req.body.password;
  var new_user = {
    "username": username,
    "events": [{}]
  };
  res.redirect('/landingPage')
  Insert(new_user);
})

app.get('/landingPage', function (req, res) {
  const date = new Date();
  res.render('landingPage', { today: date.toDateString() });
})

var eventItems = [];
var resultArr = [];
var inputEvent,
  inputDate;

app.get("/calendar", function (req, res) {
  console.log(inputDate);
  res.render('calendar', { newListItem: eventItems, resultArr, eventDate: inputDate ,uri: uri});

})

app.post("/calendar", function (req, res) {
  inputEvent = req.body.eventInput;
  inputDate = req.body.eventDate;
  eventsObj = {
    date: inputDate,
    description: inputEvent
  };
  if (inputEvent !== "") {
    Insert(eventsObj).catch(console.dir);
    eventItems.push(inputEvent);
  }
  res.redirect("/calendar");
})

async function Insert(obj) {
  try {
    const MongoClient = require('mongodb').MongoClient;
    const client = new MongoClient(uri, { useNewUrlParser: true });

    // Connect to the client and query
    await client.connect();

    const collection = client.db("SampleDatabase").collection("n");

    // Find the document with "username" equal to username variable
    const foundobj = await collection.findOne({ 'username': "Techie"});

    // If the document is found, insert the "obj" object into the "events" array
    if (foundobj) {
      const updatedEvents = [...foundobj.events, obj];
      await collection.updateOne({ 'username': username }, { $set: { events: updatedEvents } });
    } else {
      console.error("No document with username 'Techie' was found");
    }
  } catch (error) {
    console.error("Error while inserting: ", error);
  } finally {
    // Close the connection to the client
    await client.close();
  }
}


async function main() {
  const MongoClient = require('mongodb').MongoClient;
  const client = new MongoClient(uri, { useNewUrlParser: true });

  // Connect to the client and query
  await client.connect();

  var foundobj = collection.findOne({ 'username': username })
  foundobj.then(function (doc, e) {
    founduser = JSON.stringify(doc)
  })

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

      date = new Date(result.last_review).toDateString();
    });
  }
}


app.get('/chatRoom', function (req, res) {
res.render('chatRoom');
});



io.on('connection', (socket) => {
  console.log("A user is connected");
  userJoin(socket.id,username);
  socket.on('chat message', (msg,username) => {
    
    var user = getCurrentUser(socket.id);
    io.emit('chat message', username + ": " + msg);
  });
});

io.on("disconnect",(socket)=>{
  console.log("A user is disconnected")
})


app.get('/searchArticles', function (req, res) {
  res.render('search_articles');
})

app.post('/searchArticles', function (req, res) {
  article_search = req.body.searchInput;
  res.redirect("/articles");

})
app.get('/articles', (req, res) => {
  res.render('articles', { article_keyword: article_search, apikey: apikey })
})

server.listen(3000, function (req, res) {
  console.log("The server is running at port 3000");
})