const express = require('express');
const app = express();
const port = process.env.PORT || '8000';
const users=require('./routes/users');
const router = require('./routes/users');
// Middle ware
app.use("/users",users);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('HI There this is base ');
  });
  
  app.listen(port, (err) => {
    if (err) {
      return console.log('ERROR: ' + err);
    }
    console.log('Listening on Port ' + port);
  });

app.set('view engine', 'ejs');
app.set('views', './view');
  
  
