const path  = require('path');
const fs = require('fs');

var inputPath = process.argv[2];

//-------My created methods----------
//Checks if the path exists
const pathExists = (route) => fs.existsSync(route);
// console.log("Checks if the path exists: ")
// console.log(pathExists(inputPath));

//Checks if it's an absolute path, if it's returns the route, if not it converts a relative path in and absolute path
var pathCheck = (route) => path.isAbsolute(route) ? route : path.resolve(route);
// console.log("Absolute path to check: ")
// console.log(pathCheck(inputPath));

//Checks if the route is a file or a directory
var checkExt = (route) => {
  if (path.parse(route).ext !== '') {
      var fileExt = path.parse(route).ext;
      return fileExt  //it's a file 
  } else {
      return false  // it could be a directory
    }
}
// console.log("is it a file?: ")
// console.log(checkExt(inputPath));

//Check if the path is a directory
var checkDir = (route) => {
  var statsInput= fs.statSync(route);
  var isDir = statsInput.isDirectory();
  return isDir;
}
// console.log("is it a directory?: ")
// console.log(checkDir(inputPath));

//Returns the list of files in a directory
var readDir = (route) => fs.readdirSync(route, 'utf-8');
// console.log("List of things inside a directory: ")
// console.log(readDir(inputPath));

//Checks if a file is a markdown (.md) file
var checkMarkdown = (route) => {
  if (path.extname(route) == ".md") {
    var isMarkdown = 'true';
    return isMarkdown
  } else {
    return false; //it's not an .md file
    }
}
// console.log("is it an .md file?")
// console.log(checkMarkdown(inputPath));

//Reads a file---Not for directories only for files
var readFile = (route) => fs.readFileSync(route, 'utf-8');
// console.log("Reading a file")
// console.log(readFile(inputPath)); 

//Joins different pieces of a route---When it's a directory it has to turn the list of files into a list of absolute routes to read each file
const joinPath = (dir, file) => path.join(dir, file);

//Function to get the array with .md files to analize and the errors in the route

const getMdFiles = (path) => {
  var mdFiles = [];
  if (pathExists(path)) {
      var routeAbsolute = pathCheck(path);
      console.log("ruta absoluta",routeAbsolute);
      var dir = checkDir(routeAbsolute);
      console.log("es directorio?",dir);
      var ext = checkExt(routeAbsolute);
      if (dir) { //When it's a directory
        var listFilesDir = readDir(routeAbsolute);
        listFilesDir.forEach((dirFile) => {
            var joinedPath = joinPath(routeAbsolute, dirFile);
            var recheck = getMdFiles(joinedPath);
            mdFiles = mdFiles.concat(recheck);
        });
        return mdFiles.length !== 0 ?mdFiles : 'The directory does not have files'
      } if(ext) { //When it's a file
        console.log(checkMarkdown(routeAbsolute));
         if (checkMarkdown(routeAbsolute) == "true") { //When it's a .md
            mdFiles = mdFiles.concat(routeAbsolute);
            return mdFiles
          } else {
            return 'This is not an .md file'
            // return 'This route does not have an md file and this program only checks md files'
            }
        } else {
          return 'this is not a file or directory check and try again'
        } 
  } else {
      //return mdFiles
      return 'The input route does not exists or the file does not have any extension'
  }
};

// const getMdFiles = (path) => {
//   var mdFiles = [];
//   if (pathExists(path)) {
//       var routeAbsolute = pathCheck(path);
//       console.log(routeAbsolute);
//       var isFile = checkExt(routeAbsolute);
//       console.log(isFile);
//       if (isFile === ".md") { //When it's a file
//         if (checkMarkdown) { //When it's a .md
//           mdFiles = mdFiles.concat(routeAbsolute);
//           return mdFiles
//         } else {
//           return 'This route does not have an md file and this program only checks md files'
//           }
//       } else { //When it's a directory
//         var dir = checkDir(routeAbsolute);
//         if (dir) {
//           var listFilesDir = readDir(routeAbsolute);
//           listFilesDir.forEach((dirFile) => {
//               var joinedPath = joinPath(routeAbsolute, dirFile);
//               var recheck = getMdFiles(joinedPath);
//               mdFiles = mdFiles.concat(recheck);
//           });
//           return mdFiles.length !== 0 ? mdFiles : 'The directory does not have files'
//         } 
//       }    
//   } else {
//       return 'The input route does not exists'
//   }
// };

console.log(getMdFiles(inputPath));

module.exports = {
  pathExists, 
  pathCheck,
  checkExt,
  checkDir,
  readDir,
  checkMarkdown,
  readFile,
  joinPath
};


