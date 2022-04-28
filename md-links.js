const path  = require('path');
const fs = require('fs');

var inputPath = process.argv[2];

var options = {
    validate: false,
    stats: false
};

if (process.argv.includes('--validate')){
    options.validate = true;
}

if (process.argv.includes('--stats')){
    options.stats = true;
};

console.log(options);

//-------My created methods----------
//Checks if the path exists
const pathExists = (route) => fs.existsSync(route);
console.log(pathExists(inputPath));

//Checks if it's an absolute path, if it's returns the route, if not it converts a relative path in and absolute path
var pathCheck = (route) => path.isAbsolute(route) ? route : path.resolve(route);
console.log(pathCheck(inputPath));

//Checks if the route is a file or a directory
var checkExt = (route) => {
  if (path.parse(route).ext !== '') {
      var fileExt = path.parse(route).ext;
      return fileExt  //it's a file 
  } else {
      return false  // it's a directory
    }
}
console.log(checkExt(inputPath));

//Returns the list of files in a directory
var checkDir = (route) => fs.readdirSync(route, 'utf-8');
console.log(checkDir(inputPath));

//Checks if a file is a markdown (.md) file
var checkMarkdown = (route) => {
  if (path.extname == ".md") {
    var isMarkdown= "true";
    return isMarkdown
  } else {
    return false; //it's not an .md file
    }
}
console.log(checkMarkdown(inputPath));

//Reads a file---Not for directories
var readFile = (route) => fs.readFileSync(route, 'utf-8');
console.log(readFile(inputPath)); 

//Joins different pieces of a route---When it's a directory it has to turn the list of files into a list of absolute routes to read each file
const joinPath = (dir, file) => path.join(dir, file);
console.log(joinPath(inputPath,extra));

module.exports = {
  pathExists, 
  pathCheck,
  checkExt,
  checkDir,
  checkMarkdown,
  readFile
};


