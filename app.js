const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

let posts = [];


const homeStartingContent = "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  res.render("home", {homePage: homeStartingContent, posts: posts});
});

app.get("/about", function(req, res){
  res.render("about", {aboutPage: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactPage: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");

  app.post("/compose", function(req, res){
    const postTitle = req.body.postTitle;
    const postBody = req.body.postBody;
    const post = {
      title: postTitle,
      content: postBody
    };

    posts.push(post);

    res.redirect('/');
  });
  
});


app.get("/posts/:postName", function(req, res){
  const requestTitle = req.params.postName;
  posts.forEach(function(post){
    const storedTitle = post.title;
    const storedBody = post.body;
    if(_.toLower(storedTitle) == _.toLower(requestTitle)){
      res.render("post", {
        storedTitle: post.title,
        storedBody: post.content
      });
    } 
  });

});









app.listen(3000, function() {
  console.log("Server started on port 3000");
});