const express = require('express');
const app = express();
const port = 3000;

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
/*
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
*/
/*-----------MySql - Stickynotes----------------*/

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
      console.log('2');
      res.send(results);
      console.log(results[1].bgcolor)
      console.log('3');
    });
   
   console.log('1');
   connection.end();
   })

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