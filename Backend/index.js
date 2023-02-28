'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'bd',
    user: 'root',
    password: ''

});

app.use(cors());
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );





/**
 * Gets all the partidas from the database
 * and sendit to the service in angular
 */
app.get('/partidas',(req,res) => {
const query = 'SELECT * FROM partidas';

  connection.query(query, (err, result) => {
    try {
      if(result != 0){
        res.json(result);
      }
    } catch (error) {
      res.status(500).send({ results: null });

    }
  });
});

/**
 * Gets the object ranking form the ranking service
 * and tries to insert it into the database
 * if have any error return error message
 */
app.post('/CreatePartida',(req,res) => {
  const { id, juego, jugadores,fecha,hora,ganador } = req.body;

  const query = `INSERT INTO partidas (id, juego, jugadores, fecha, hora, ganador) VALUES ('${id}', '${juego}', '${jugadores}', '${fecha}', '${hora}', '${ganador}');`;

    connection.query(query , (err, result) => {
      try {
        if(result != 0){
          res.json(result);
        }else{
          res.status(404).send({results: null});
        }
      } catch (error) {
        res.status(500).send({ results: null });
      }
    })
});

/**
 * gets the object partida
 */
app.post('/UpdatePartida',(req,res) => {
  console.log(req.body);

  const {id, juego, jugadores, fecha,hora,ganador} = req.body;
  const query = `Update partidas set juego='${juego}',jugadores='${jugadores}',fecha='${fecha}',hora='${hora}',ganador='${ganador}' WHERE id = '${id}'`
  connection.connect();
  connection.query(query , (err, result) => {
    if (err){
      console.log(err);
      res.status(500).send({ results: null });
    } else {
        if(result != 0){
          res.json(result);
        }else{
          res.status(404).send({results: null});
        }
    }
  })
  connection.end();
});

/**
 * gets the object partida from the ranking service in angular
 * and tries to delete the object partida with the given id
 */
app.post('/DeletePartida',(req,res) => {
  const query = 'DELETE FROM partidas WHERE id = ' + req.body.id;
    connection.query(query, (err, result) => {
      try {
        if(result != 0){
          res.json(result);
        }else{
          res.status(404).send({results: null});
        }
      } catch (error) {
        res.status(500).send({ results: null });
      }
    });  
});


/**
 * gets the Username and password from the User service in angular and tries to
 * compare the username and password to login and return a token for the user
 */
app.post('/login', async (req, res) => {
  console.log(req.body);
  const { _username, _password } = req.body;

  //const hash = await bcrypt.hash(_password, 1);

  const query = `SELECT * FROM users WHERE email = '${_username}' AND password = '${_password}'`;
      connection.query(query, function (error, results, field) {
          if(results.length != 0){
            const token = jwt.sign(JSON.stringify({user: _username}), 'secretpassword');
            return res.status(200).send({'Acces_Token': token, 'status':'success'});
            //si no hay usurio execute error
          }else{
            res.status(404).send({'status':'Not Found'});
          }
       
      })  
});

/**
 * This method gets the new User wants to be register in the database
 * and puts the new user in the database if have any error returns a status
 */
app.post('/register', async (req, res) => {
  const { _username, _password, _email } = req.body;
  console.log(req.body);


  //const hash = await bcrypt.hash(_password, 1);

  let query = `INSERT INTO users (name, email, password, role) VALUES ('${_username}', '${_email}', '${_password}', 'User')`;

   connection.query(query, function (error, results, field) {
    try {
      res.status(200).send({"status":"success"});
    } catch (error) {
      res.status(400).send({ results: "error" })
    }
  })
});



app.listen(3001,80, () => {
    console.log('Aquesta és la nostra API-REST que corre en http://localhost:3001')
})