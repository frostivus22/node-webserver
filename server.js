const express = require('express');

const hbs = require('hbs');

const fs = require('fs'); //the npm that allows you to create notes

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');  //to be able to use hbs this argument is required and you must also create a folder named view with files that have .hbs as the type


app.use((req, res, next) => { //middleware creation in express
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  //the third argument is requires which is (err)
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next(); //next is needed for it to go on
});
//to using this for the sake that of maintenance it wont go next
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle:'Maintenance'
//
//   });
// });

app.use(express.static(__dirname + '/public')); //express executes in first come first served basis so help.html can bypass the maintenance mode
//to stop this from happening we placed /public below maintenance to avert being bypassed

//calling on the hbs to create a function
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt' ,(text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>hello world</h1>');
  res.render('home.hbs', {
    pageTitle:'Home Page',
    welcomeMessage:'Hello there',

  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle:'About Page',

  });
});

app.get('/projects', (req,res) => {
  res.render('about.hbs', {
    pageTitle:'Projects Page',

  });
});


// app.get('/maintenance', (req,res) => {
//   res.render('maintenance.hbs', {
//     pageTitle:'Maintenance',
//
//   });
// });

app.get('/bad', (req, res) => {
  res.send({
    errorMessage:'Unable to handle request'
  });
});

//assigning a server to node
app.listen(port, () => {
  console.log(`Server is up on port 3000`);
});
