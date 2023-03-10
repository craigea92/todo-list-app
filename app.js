const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
app.set('view engine', 'ejs');

let items = [];
let workItems = [];

app.get("/", function(req, res){
  let day = date.getDate();
  res.render("List", { listTitle: day, newListItems: items });
});

app.post("/", function(req, res){
  let item = req.body.newItem;

  if(req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res){
  res.render("List", {listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work")
});

app.get("/about", function(req, res){
  res.render("About");
})

app.listen(3000, function(){
  console.log("Server started on port 3000");
});