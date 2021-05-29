/*-----------Building a REST API using Node.js/ Express / MySql----------------*/

const express = require('express');
const app = express();
const port = 3001;
//const port=process.env.PORT||3001; 
const cors = require('cors');
app.use(cors());

//bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

/*-----------MySql - GET Users----------------*/

app.get('/users', (req, res) => {
var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'stickynotesapp'
});
 
connection.connect();

connection.query('SELECT * from users', function (error, results, fields) { //ORM
   if (error) throw error;
   //console.log('2');
   res.send(results);
   //console.log('3');
 });

//console.log('1');
connection.end();
})

/*-----------MySql - GET Stickynotes----------------*/

app.get('/stickynotes', (req, res) => {
   var mysql      = require('mysql2');
   var connection = mysql.createConnection({
     host     : 'localhost',
     user     : 'root',
     password : '123456',
     database : 'stickynotesapp'
   });
    
   connection.connect();
   
   connection.query('SELECT * from stickynotes', function (error, results, fields) { //ORM
      if (error) throw error;
     // console.log('2');
      res.send(results);
     
    });
   
   //console.log('1');
   connection.end();
   })

/*-----------DELETE - Stickynotes----------------*/

app.delete('/stickynotes/:stickynoteid', (req, res)=>{
   // TODO: get the id from path parameters
   // TODO: query the database to delete the stickynote with that id
   //req.
   
      var mysql      = require('mysql2');
      var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : 'stickynotesapp'
      });
       
      connection.connect();
      let { stickynoteid } = req.params.stickynoteid;
      let sql = `DELETE FROM stickynotes WHERE stickynoteid = ${req.params.stickynoteid}`;
        
      console.log("id: ", req.params.stickynoteid);
      connection.query(sql, (error, results, fields)=> { 
      if (error) return console.error(error.message);
      res.status(200).send(results);
      console.log('Deleted Row(s):', results.affectedRows);
    });
      
    
      connection.end();
      })
   
/*-----------PATCH - Stickynotes----------------*/
app.patch('/stickynotes/:stickynoteid', (req, res)=>{
   
      var mysql      = require('mysql2');
      var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : 'stickynotesapp'
      });
       
      connection.connect();
      let { stickynoteid } = req.params.stickynoteid;
      //console.log("text: ", req.body);
      console.log("Body: ", req.body);
      let sql = `UPDATE stickynotes SET text =  '${req.body.text}' WHERE stickynoteid = '${req.params.stickynoteid}'`;
      //let sql = `UPDATE stickynotes SET bgcolor =  '${req.body.bgcolor}' WHERE stickynoteid = '${req.params.stickynoteid}'`;
      console.log("id: ", req.params.stickynoteid);
      connection.query(sql, (error, results, fields)=> { 
      if (error) return console.error(error.message);
      res.status(200).send(results);
      
    });
      connection.end();
      })


/*-----------POST - Users----------------*/
      app.post('/users', (req, res)=>{
   
         var mysql      = require('mysql2');
         var connection = mysql.createConnection({
           host     : 'localhost',
           user     : 'root',
           password : '123456',
           database : 'stickynotesapp'
         });
          
         connection.connect();
      
         const user = {
           username: req.body.username,
           email: req.body.email,
           password: req.body.password
          }
         
          connection.query('INSERT INTO users SET ?', user, function (error, results) {
            if (error) throw error;
            // if there are no errors send an OK message.
            //res.send('User Saved succesfully');
            //res.sendStatus(200);
            res.status(200).send(results);
          });
         connection.end();
         });
      
      
/*-----------POST - Stickynotes----------------*/

app.post('/stickynotes', (req, res)=>{
   
   var mysql      = require('mysql2');
   var connection = mysql.createConnection({
     host     : 'localhost',
     user     : 'root',
     password : '123456',
     database : 'stickynotesapp'
   });
    
   connection.connect();

   // handle the POST request.
   var stickynote = {
     userid: req.body.userid, 
     stickynoteid: req.body.stickynoteid,
     title: req.body.title,
     posx: req.body.posx,
     posy: req.body.posy,
     bgcolor:req.body.bgcolor,
     color:req.body.color,
     text:req.body.text
    }
    
    connection.query('INSERT INTO stickynotes SET ?', stickynote, function (err, results) {
      if (err) throw err;
      // if there are no errors send an OK message.
      // res.send('Stickynote Saved succesfully');
      res.sendStatus(200);
    });
   connection.end();
   });

/*-----------Listening to PORT----------------*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});



/*
To delete data in MySQL database from a node.js application, you follow these steps:

--Establish a connection to the MySQL database.
--Execute a DELETE statement by calling the query() method on a Connection object.
--Disconnect from the MySQL database server.

app.get('/stickynotes', (req, res) => {
   var mysql      = require('mysql2');
   var connection = mysql.createConnection({
     host     : 'localhost',
     user     : 'root',
     password : '123456',
     database : 'stickynotesapp'
   });
    
   connection.connect();

   let sql = `DELETE FROM stickynotes WHERE stickynotekey = ?`;
   connection.query(sql, 1, (error, results, fields)=> { 
      if (error) 
      return console.error(error.message);
      res.send(results);
      console.log('Deleted Row(s):', results.affectedRows);
    });
   
   
   connection.end();
   })
*/

/*-----------fake api notes----------------*/
/*
app.get('/notes', (req, res) => {
   // sql.execute("get the notes from database");
   const notes = [
      {
         key: "1",
         title: "ToDo1",
         positionX: "100px",
         positionY: "150px",
         color: "black",
         bgColor: "blue",
         text: "test"
      },
      {
         key: "2",
         title: "ToDo2",
         positionX: "400px",
         positionY: "600px",
         color: "black",
         bgColor: "yellow",
         text: "test"
      },
      {
         key: "3",
         title: "ToDo3",
         positionX: "200px",
         positionY: "300px",
         color: "black",
         bgColor: "pink",
         text: "test"
      },
   ]
    
   //console.log(notes[0].positionX)
   res.send(notes)
 });
*/