var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articleOne = {
    title: 'Article One',
    heading1:  'Article One',
    heading2:  'Personal Information:BODHISATTWA ROY',
    date: 'Feb 11, 2017',
    content: 
           `<p>
              I am Bodhisattwa Roy.
           </p>
           <p>
              I am from Santoshpur,Hooghly.
              
              
           </p>
           <p>
             I am an Electrical Engineer.
           </p>
           <p>
             I have passsed my 10th from Kamarpukur Ramkrishna Mission Multipurpose School in 2008 securing 83.5 %.
           </p>
           <p>
              I have passed my 10+2 from Goghat High School in 2010 securing 84.4%(Science).
           </p>
           <p>
             I have completed my B.Tech in Electrical Engineering from Narula Institute of Technology in 2014.
           </p>
           <p>
              I have qualified GATE exam in 2014, 2015 and 2016.
           </p>
           <p>
            I have worked as a Graduate Apprentice Trainee(BOPT) in Garden Reach Shipbuilders & Engineers Limited(GRSE Ltd.) FOJ unit from 29.05.2015 to 28.05.2016.
           </p>`
};

function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading1 = data.heading1;
    var heading2 = data.heading2;
    var content =data.content;
    
  var htmlTemplate = 
    `<html>
      <head>
        <title>
         ${title}
        </title>  
        <meta name="viewport" content="width-device-width, initial-scale-1" />
         <link href="/ui/style.css" rel="stylesheet" />
      </head>
      <body>
         <div class="container">
           <div>
              <a href="/">Home</a>
           </div>
           <hr/>
           <h3>
              ${heading1}
           </h3>
           <h4>
              ${heading2}
           </h4>
           <div>
              ${date}
           </div>
           <div>
             ${content}
           </div>
         </div>
      </body>      
    
    </html>
  `;
  return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/Article-One', function(req, res){
     res.send(createTemplate (articleOne));
});

app.get('/Article-Two', function(req, res){
     res.sendFile(path.join(__dirname, 'ui', 'Article-Two-Family.html'));
});

app.get('/Article-Three', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'Article-Three-My Favourites.html')); 
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
