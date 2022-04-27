var fs = require('fs');
var path  = require('path');

var options = {
  validate: false,
  stats: false
}

var listLinks = [];
var linksStatus = [];
var total = 0;
var unique = 0;
var broken = 0;

var path = process.argv[2];

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

console.log(path);
console.log(options);

//My created methods

//Checks if the path exists
var pathExists = (route) => fs.existSync(route);
console.log(pathExists(path));

//Checks if it's an absolute path, it it's returns the e, if not it converts a relative path in and absolute path
var pathCheck = (route) => path.isAbsolute(route) ? route : path.resolve(route);
console.log(pathCheck(path));

//Checks if the route is a file or a directory
var checkExt = (route) => {
  if (path.parse(route).ext !== '') {
      var fileExt = path.parse(route).ext;
      return fileExt
  } else {
      return false
    }
}
console.log(checkExt(path));

//Returns the list of files in a directory
var checkDir = (route) => fs.readdirSync(route, 'utf-8');
console.log(checkDir(path));

//Checks if a file is a markdown (.md) file
var checkMarkdown = (route) => {
  if (path.extname == ".md") {
    var isMarkdown= "true";
    return isMarkdown
  } else {
    return false;
    }
}
console.log(checkMarkdown(path));

//Reads a file
var readFile = (route) => fs.readFileSync(route, 'utf-8');
console.log(readFile(path));

//Joins different pieces of a route
const joinPath = (dir, file) => path.join(dir, file);
console.log(joinPath(path,extra));

module.exports = () => {
  pathExists, 
  pathCheck,
  checkExt,
  checkDir,
  checkMarkdown,
  readFile
};


