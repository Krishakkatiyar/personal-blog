const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const { find } = require("lodash");
mongoose.connect("mongodb://localhost:27017/blogdb", { useNewUrlParser: true, useUnifiedTopology: true });
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "we are student of BCA 3rd year";
const contactContent = "Meet us on social media or, you can see our work on git";

const app = express();
const port =process.env.PORT || 3000;

app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});
const post = mongoose.model("post", postSchema);
/*const mob = new post({
    title: "mob",
    contain: "jdcjskdjcksj"
});*/
//mob.save();
//let posts = [];

app.get("/", function(req, res) {
    post.find({}, function(err, posts) {
        res.render("home", {
            homeContent: homeStartingContent,
            post: posts
        });
    });
});

app.get("/about", function(req, res) {
    res.render("about", { aboutcontent: aboutContent });
});

app.get("/contact", function(req, res) {
    res.render("contact", { contactcontent: contactContent })
});

//for compose
app.get("/compose", function(req, res) {
    res.render("compose");

});
app.post("/compose", function(req, res) {
    const pos = new post({
        title: req.body.ptitle,
        content: req.body.postbody
    });
    pos.save(function(err) {
        if (!err) {
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    });

});
app.get("/post/:postID", function(req, res) {
    const pid = req.params.postID;

    post.findOne({ _id: pid }, function(err, post) {
        res.render("post", {
            title: post.title,
            content: post.content
        });
    });
    /*posts.forEach(function(post) {
         if (more === _.lowerCase(post.title)) {
             res.render("post", {
                 title: post.title,
                 content: post.content
             });
         }
     });*/
});




app.listen(port, function() {
    console.log("Server started on port 3000");
});
