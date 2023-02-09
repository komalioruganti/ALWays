exports.login = (req, res) => {
    res.render('login');
}

exports.landingPage = (req, res) => {
    const date = new Date();
    res.render('landingPage', { today: date.toDateString() });
}

exports.chatRoom = (req, res) => {
    res.render('chatRoom');
}

exports.getsearchArticles = (req, res) => {
    res.render('search_articles');
}

exports.postsearchArticles = function (req, res) {
    article_search = req.body.searchInput;
    res.redirect("/articles");

}

require("dotenv").config();
const apikey = process.env.MEDIASTACK_API_KEY
var article_search = "Ola";
exports.articles = (req, res) => {
    res.render('articles', { article_keyword: article_search, apikey: apikey })
}