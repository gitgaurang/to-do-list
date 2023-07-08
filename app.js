const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");


const app = express();

let items = ["Buy food", "Cook food ","Eat food"];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/",function (req,res) {
    let today = new Date();
    let options = {
       weekday: "long" ,
       day: "numeric",
       month: "long"
    };

    let day = today.toLocaleDateString("en-us", options);
    res.render("list",{listTitle: day, newListItems: items});
});

app.post("/", function (req,res) {
   
    let item = req.body.newItem;
    if (req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work");
    } else{
        items.push(item);
        res.redirect("/");
    }




})

app.get("/work", function (req,res) {
    res.render("list",{listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function (req,res) {
    res.render("about")
})



app.listen(process.env.PORT || 3000,function () {
    console.log("server is listening at 3000");
});
