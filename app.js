//jshint esversion:6

// required node modules
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const res = require("express/lib/response");

// array of to-do list items
let items = [];
let workItems = [];

// initialise ejs, body parser & public folder
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// setting up the home route
app.get("/", (req, res) => {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("lists", { listTitle: day, newItems: items });
});

// posting to home route
app.post("/", (req, res) => {
  let item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

app.get("/work", (req, res) => {
  res.render("lists", {listTitle: "Work List", newItems: workItems});
})

// posting to work route
app.post("/work", (req, res) => {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

// setting up local and heroku servers
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});