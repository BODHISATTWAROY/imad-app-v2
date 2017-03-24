var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user: "bodhisattwaroy",
    database: "bodhisattwaroy",
    host: "db.imad.hasura-app.io",
    port: "5432",
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: {maxAge: 1000 * 60 * 60 * 24 *30}
}));

var articles = {
    'Article-One': {
         title: 'ARTICLE ONE',
         heading1:  'Article One',
         heading2:  'Personal Information:BODHISATTWA ROY',
         heading3: 'Feb 11, 2017',
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
         title: 'ARTICLE TWO',
         heading1:  'Article Two',
         heading2:  'Family:BODHISATTWA ROY',
         heading3: 'Feb 11, 2017',
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
         title: 'ARTICLE THREE',
         heading1:  'Article Three',
         heading2:  'My Favourites:BODHISATTWA ROY',
         heading3: 'Feb 11, 2017',
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
      'Sign-Up': { 
         title: 'SIGN UP',
         heading1: 'EXPLORE blog@YOU',
         heading2: 'LOOKING FOR SOMETHING MORE?',
         heading3: 'CREATE YOUR OWN ACCOUNT',
         
        content:
          `<p>
          <h4>
            ALREADY A MEMBER?
            </h4>
            <a href="Sign-In" class="container">Sign In</a>
            </p>
            <br>
            <p>
            <h4>
            NOT A MEMBER YET? CREATE AN ACCOUNT!
            </h4>
            </p>
            <p>
             <input type="text" id="name" placeholder="Name"></input>
             <input type="text" id="name" placeholder="Date of Birth(dd/mm/yyyy)"></input>
             </p>
             <p>
            <input type="text" id="name" placeholder="E-Mail id"></input>
            <input type="text" id="name" placeholder="Phone No."></input>
            </p>
            <p>
            <input type="text" id="name" placeholder="UserName"></input>
            </p>
            <p>
            <input type="text" id="name" placeholder="Enter Your Password"></input>
            </p>
            <p>
            <input type="text" id="name" placeholder="Confirm Your Password"></input>
            </p>
            <input type="submit" value="Sign Up" id="submit_btn"></input>
           </p>`
          },
          
      'Sign-In': { 
         title: 'SIGN IN',
         heading1: 'WELCOME BACK',
         heading2: 'ENJOY blog@YOU',
         heading3: 'TELL ME SOMETHING ABOUT YOU',
    content:
        
         `<p>
            <h4>
               SIGN IN TO YOUR ACCOUNT !
            </h4>
            <p>
              <input type="text" id="name" placeholder="User Name"></input>
            </p>
            <p>
              <input type="text" id="name" placeholder="Password"></input>
            </p>
            <p>
              <input type="submit" value="Sign In" id="submit_btn"></input>
            <br>
             <h4>
               NOT A MEMBER YET? SIGN UP NOW !
             </h4>
               <a href="Sign-Up" class="container">Sign Up</a>
          </p>`
          },
};

function createTemplate (data) {
    var title = data.title;
    var heading1 = data.heading1;
    var heading2 = data.heading2;
    var heading3 = data.heading3;
    var content =  data.content;
    
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
               <a href="/articles/Article-One" class="container" target="_blank">Article One</a>
               <a href="/articles/Article-Two" class="container" target="_blank">Article Two</a>
               <a href="/articles/Article-Three" class="container" target="_blank">Article Three</a>
               <a href="/articles/Sign-Up" class="container" target="_blank">Sign Up</a>
               <a href="/articles/Sign-In" class="container" target="_blank" >Sign In</a>
             </div>
           <hr/>
           <h2>
              ${heading1}
           </h2>
           <h3>
              ${heading2}
           </h3>
           <div>
           <h4>
              ${heading3}
            </h4>
           </div>
           <div>
             ${content}
           </div>
           <hr/>
             <h4>Comments</h4>
              <div id="comment_form">
              </div>
              <div id="comments">
                <center>Loading comments...</center>
              </div>
          </div>
          <script type="text/javascript" src="/ui/article.js"></script>
         </div>
      </body>      
    
    </html>
  `;
  return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash (input,salt) {
 //How to create a hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
    
    
    //algorithm: md5
    //'password' -> serhunj34h98sjkjsn
    //'password-this-is-a-random-string' -> 34yhgtnja8934oq3h4809h3wjv398vhuh
    //'password' -> 'password-this-is-a-random-string' -> <hash> -> <hash> x 10000 times
}


app.get('/hash/:input', function(req,res) {
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});


app.post('/create-user', function(req, res){
    //username, password
    //{"username": "bodhisattwa", "password": "password"}
    //JSON
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result){
        if (err) {
           res.status(500).send(err.toString());
       } else{
           
           res.send('User Successfully Created: ' + username);
       }
    });
});

app.post('/login', function(req,res){
      var username = req.body.username;
    var password = req.body.password;
   
    pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result){
        if (err) {
           res.status(500).send(err.toString());
       } else{
           if (result.rows.length === 0) {
               res.send(403).send('username/password is invalid');
           } else {
               //Match the Password
           var dbString = result.rows[0].password;
           var salt = dbString.split('$')[2];
           var hashedPassword = hash(password, salt); //Creating a hash based on the password submitted and the original salt.
           if (hashedPassword ===dbString){
               
               
               //Set A Session
               req.session.auth = {userId: result.rows[0].id};
               //Set Cookie With a Session Id
               //Internally, on the server side, it maps the session id with an object
               //{ auth: {userId}}
               
           res.send('Credentials Are Correct!');
           
           
           
           
           
           } else {
               res.send(403).send('username/password is invalid');
                }
          }
       }
    });
});


 app.get('/check-login', function(req, res){
    if (req.session && req.session.auth && req.session.auth.userId) {
        //Load the user object
         pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
     });
  } else {
        res.send('You Are Not Logged In');
    }
 });
 
 app.get('/logout', function(req, res){
     delete req.session.auth;
     res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');
 });


var pool = new Pool(config);

app.get('/get-articles', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT * FROM article ORDER BY date DESC', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.get('/get-comments/:articleName', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT comment.*, "user".username FROM article, comment, "user" WHERE article.title = $1 AND article.id = comment.article_id AND comment.user_id = "user".id ORDER BY comment.timestamp DESC', [req.params.articleName], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.post('/submit-comment/:articleName', function (req, res) {
   // Check if the user is logged in
    if (req.session && req.session.auth && req.session.auth.userId) {
        // First check if the article exists and get the article-id
        pool.query('SELECT * from article where title = $1', [req.params.articleName], function (err, result) {
            if (err) {
                res.status(500).send(err.toString());
            } else {
                if (result.rows.length === 0) {
                    res.status(400).send('Article not found');
                } else {
                    var articleId = result.rows[0].id;
                    // Now insert the right comment for this article
                    pool.query(
                        "INSERT INTO comment (comment, article_id, user_id) VALUES ($1, $2, $3)",
                        [req.body.comment, articleId, req.session.auth.userId],
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err.toString());
                            } else {
                                res.status(200).send('Comment inserted!')
                            }
                        });
                }
            }
       });     
    } else {
        res.status(403).send('Only logged in users can comment');
    }
});


app.get('/articles/:articleName', function(req, res){
    //articleName == Article-One
    //articles[articleName] == {} content object for Article-One
   
     //SELECT * FROM article WHERE title = '\'; DELETE WHERE a = \'asdf'
     pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function (err,result){
        if (err) {
            res.status(500).send(err.toString());
        } else {
            if (result.rows.length === 0) {
                res.status(404).send('Article Not Found');
            } else {
                var articleData = result.rows[0];
                 res.send(createTemplate(articleData));
            }
        }
     });
    
});



app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
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

  app.get('/ui/linkedin_icon.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'linkedin_icon.png'));
});

 app.get('/ui/fb_icon.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'fb_icon.png'));
});

 app.get('/ui/twitter_icon.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'twitter_icon.png'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
