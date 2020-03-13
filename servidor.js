var express = require("express");
var app = express();

app.get("/", inicio);
app.get("/servicios", servicios);


function inicio(req, res){
  res.send("<h1>Hola mundo</h1>");
}

function servicios(req, res){
  res.send("<h1>Hola mundo servicio</h1>");
}


app.listen(8989);
