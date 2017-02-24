var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles = {
    'Article-One': {
         title: 'Article-One',
         heading1:  '<li>Article One</li>',
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
},
    'Article-Two': { 
         title: 'Article-Two',
         heading1:  '<li>Article Two</li>',
         heading2:  'Family:BODHISATTWA ROY',
         date: 'Feb 11, 2017',
    content:
          `<p>
             My father is Mr. Dilip Kumar Roy.
          </p>
          <p>
              He is an Agent of L.I.C.I.
          </p>
          <p>
             My mother is Smt. Minati Roy.
          </p>
          <p>
             She is an Housewife.
          </p>
          <p>
              My brother is Mr. Budhaditya Roy.
          </p>
          <p>
             He Has completed his B.Sc. in Physics from Burdwan University in 2014 an completed his M.Sc. in Electronic Science from Jadavpur University in 2016.
          </p>
          <p>
              I love my family very much.
          </p>`
          },
    'Article-Three': {
         title: 'Article-Three',
         heading1:  '<li>Article Three</li>',
         heading2:  'My Favourites:BODHISATTWA ROY',
         date: 'Feb 11, 2017',
    content:
         `<p>
              I love to play Cricket and Chess.
          </p>
          <p>
              Sachin Tendulkar is my favourite Cricket player.The way he handeled pressure throughout his entire career of more than 24 years is quite amazing. 
          </p>
          <p>
             Viswanathan Anand is my favourite Chess player.He is Five times World Champion in the game of Chess which is known to almost every second human in this planet.He deserves more honour from India.
          </p>
          <p>
             I love to watch Lawn Tennis.Roger Federer is my favourite tennis player.He has won 18 grand slam titles till date.According to me, he is the greatest tennis player of all time.  
          </p>
          <p>
             I love to read story books, especially detective stories very much.
          </p>
          <p>
             I like listening to music specially soft ones.
          </p>
          <p>
              I spend my leisure time by watching movies,playing chess,sudoku etc.
          </p>
          <p>
              But the best I would like to do in my leisure time is reading a book, whatever may be the the topic it is about.
          </p>`
    },
      'Sign Up': { 
         title: 'Sign Up Page',
         heading1:  'CREATE YOUR OWN ACCOUNT',
         <hr/>
        
    content:
          `<p>
             My father is Mr. Dilip Kumar Roy.
          </p>
          <p>
              He is an Agent of L.I.C.I.
          </p>
          <p>
             My mother is Smt. Minati Roy.
          </p>
          <p>
             She is an Housewife.
          </p>
          <p>
              My brother is Mr. Budhaditya Roy.
          </p>
          <p>
             He Has completed his B.Sc. in Physics from Burdwan University in 2014 an completed his M.Sc. in Electronic Science from Jadavpur University in 2016.
          </p>
          <p>
              I love my family very much.
          </p>`
          },
          'Sign In': { 
         title: 'Sign In Page',
         heading1:  'SIGN IN TO YOUR ACCOUNT',
         <hr/>
        
    content:
          `<p>
            
          </p>
          <p>
              He is an Agent of L.I.C.I.
          </p>
          <p>
             My mother is Smt. Minati Roy.
          </p>
          <p>
             She is an Housewife.
          </p>
          <p>
              My brother is Mr. Budhaditya Roy.
          </p>
          <p>
             He Has completed his B.Sc. in Physics from Burdwan University in 2014 an completed his M.Sc. in Electronic Science from Jadavpur University in 2016.
          </p>
          <p>
              I love my family very much.
          </p>`
          },
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
           <div>
               <a href="Article-One" class="container">Article One</a>
               <a href="Article-Two" class="container">Article Two</a>
               <a href="Article-Three" class="container">Article Three</a>
               <a href="Create An Account" class="container">Sign Up</a>
               <a href="Sign Into Your Account" class="container">Sign In</a>
               <a class="dropdown-toggle" id="menu1" data-toggle="dropdown">
                    "Quick Links"  
						  <span class="caret"></span></a>
						  <ul class="dropdown-menu " role="menu" aria-labelledby="menu1">
						    <li role="presentation"><a role="menuitem" href="#">Personal</a></li>
						    <li role="presentation"><a role="menuitem" href="#">Professional</a></li>
						    <li role="presentation"><a role="menuitem" href="#">Gallery</a></li>
						    <li role="presentation"><a role="mainitem" href="#">Favourites</a></li>
						    <li role="presentation"><a role="menuitem" href="#">About Us</a></li>
						  </ul>
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

var counter = 0;
app.get('/counter', function(req, res){
   counter = counter + 1;
   res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req, res){//URL: /submit-name?name=xxxx
   //Get The Name from The Request
   var name = req.query.name; //TO Do
   
   names.push(name);
   //JSON: JavaScript Object Notation
   res.send(JSON.stringify(names)); //TO DO
});

app.get('/:articleName', function(req, res){
    //articleName == Article-One
    //articles[articleName] == {} content object for Article-One
     var articleName = req.params.articleName;
     res.send(createTemplate(articles[articleName]));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/bodhi1.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bodhi1.png'));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
