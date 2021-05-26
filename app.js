const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
});
/*
app.post('/notes', (req, res) => {
   console.log('here');
   // req.body;
   // sql.execute("INSERT INTO notes VALUES (1,title, ....)");
});
*/
/*-----------MySql - Users----------------*/

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
   console.log('2');
   res.send(results);
   console.log('3');
 });

console.log('1');
connection.end();
})

/*-----------MySql - Stickynotes----------------*/
/*-----------GET - Stickynotes----------------*/
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
     // console.log('Results: ',results);
     // console.log(results[1].stickynoteid);
      //console.log('3');

    /*  var string=JSON.stringify(results);
    console.log(string);
    var json =  JSON.parse(string);
   // to get one value here is the option
    console.log(json[0].name);*/
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
      console.log("text: ", req.body.text);
      let sql = `UPDATE stickynotes SET text =  ${req.body.text} WHERE stickynoteid = ${req.params.stickynoteid}`;
      //console.log("text: ", text);   
      console.log("id: ", req.params.stickynoteid);
      connection.query(sql, (error, results, fields)=> { 
      if (error) return console.error(error.message);
      res.status(200).send(results);
      
    });
      
    
      connection.end();
      })






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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

/*
0.key
1.positionX
2.bgColor

//0.key
//0.title
//0.positionX
//0.positionY
//0.color
//0.bgColor
//0.text

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
         positionY: "800px",
         color: "black",
         bgColor: "pink",
         text: "test"
      },
   ]

   ---------------------------------
   const notes = [
      {
         key: "1",
         title: "ToDo1",
         positionX: "700px",
         positionY: "350px",
         color: "black",
         bgColor: "blue",
         text: "test"
      }     
      
   ]
*/