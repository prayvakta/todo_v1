const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(express.static("public"));

const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

app.get('/', (req, res) => {
  res.render("list", {itemTitle: date.getDate(), listItem: items});
});

app.post('/', (req, res) => {

  if(req.body.list === "Work"){
    workItems.push(req.body.todoItem);
    res.redirect('/work');
  }
  else{
    items.push(req.body.todoItem);
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
