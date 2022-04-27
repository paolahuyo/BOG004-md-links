const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
   
var fs = require("fs");

fs.readdirSync(path, 'utf-8', (err,files)=>{
  if(error){
    throw (error);
  }
console.log(files);
});
