const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const date = require(__dirname + '/date.js');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/todoListDB', {useNewUrlParser: true, useUnifiedTopology: true});

const itemsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Item = mongoose.model("Item", itemsSchema);

app.get('/', (req, res) => {

  Item.find((err, items) => {
    if(err){
      console.error(err);
    }
    if(items.length === 0) {
      Item.insertMany([{name: "Buy food"}, {name: "Cook food"}, {name: "Eat food"}], err => err ? console.error(err) : console.log("Items added successfully"));
      res.redirect('/');
    } else {
      res.render("list", {
        itemTitle: date.getDate(),
        listItems: items
      });
    }
  });
});

app.post('/', (req, res) => {

  if(req.body.list === "Work"){
    workItems.push(req.body.todoItem);
    res.redirect('/work');
  }
  else{
    const newItem = new Item({ name: req.body.todoItem });
    newItem.save();
    res.redirect('/');
  }
})

app.get('/about', (req, res) => {
  res.render("about");
})

app.get("/work", (req, res) => {
  res.render("list", {itemTitle: "Work List", listItem: workItems});
})

let port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server working on port', port));
