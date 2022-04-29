const path  = require('path');
const fs = require('fs');

var inputPath = process.argv[2];

//-------------------Created methods------------------------
//Checks if the path exists and returns boolean
const pathExists = (route) => fs.existsSync(route); 

//Checks if it's an absolute path, if it's returns the route, if not it converts a relative path in and absolute path
var pathCheck = (route) => path.isAbsolute(route) ? route : path.resolve(route);

//Checks if the route is a file or a directory, returns the extension or a boolean false if doesn't have an extension
var checkExt = (route) => {
  if (path.parse(route).ext !== '') {
      var fileExt = path.parse(route).ext;
      return fileExt  //it's a file 
  } else {
      return false  // doesn't have extension
    }
}

//Check if the path is a directory returns a boolean
var checkDir = (route) => {
  var statsInput= fs.statSync(route);
  var isDir = statsInput.isDirectory();
  return isDir;
}

//Returns the list of files in a directory returns a boolean
var readDir = (route) => fs.readdirSync(route, 'utf-8');

//Checks if a file is a markdown (.md) file
var checkMarkdown = (route) => {
  if (path.extname(route) == ".md") {
    var isMarkdown = 'true';
    return isMarkdown
  } else {
    return false; //it's not an .md file
    }
}

//Reads a file---Not for directories only for files
var readFile = (route) => fs.readFileSync(route, 'utf-8');

//Joins different pieces of a route---When it's a directory it has to turn the files into absolute routes for each file
const joinPath = (dir, file) => path.join(dir, file);

//Function to get the array with .md files to analize without errors

const getMdFiles = (path) => {
  var mdFiles = [];
  if (pathExists(path)) {
      var routeAbsolute = pathCheck(path);
      var dir = checkDir(routeAbsolute);
      var ext = checkExt(routeAbsolute);
      if (dir) { //When it's a directory
        var listFilesDir = readDir(routeAbsolute);
        listFilesDir.forEach((dirFile) => {
            var joinedPath = joinPath(routeAbsolute, dirFile);
            var recheck = getMdFiles(joinedPath);
            mdFiles = mdFiles.concat(recheck);
        });
        return mdFiles.length !== 0 ?mdFiles : mdFiles 
      } if(ext) { //When it's a file
         if (checkMarkdown(routeAbsolute) == "true") { //When it's a .md
            mdFiles = mdFiles.concat(routeAbsolute);
            return mdFiles
          } else {
            return mdFiles 
            }
        } else {
          return mdFiles 
        } 
  } else {
      return mdFiles
  }
};

///Users/paolahuyo/PROYECTOS-LABORATORIA/BOG004-md-links/md-filesconsole.log(getMdFiles(inputPath));

var regexTextUrlGlobal = /\[(.+?)\]\((https?.+?)\)/g;
var regexTextUrl = /\[(.*)\]\((.*)\)/;
var regexUrl = /https?:\/\/(www\.)?[A-z\d]+(\.[A-z]+)*(\/[A-z\?=&-\d]*)*/g;
///^(https:\/\/www\.|http:\/\/www\.|www\.)[a-zA-Z0-9\-_$]+\.[a-zA-Z]{2,5}$/g;
//var regexText = /\[([\w\s\d\-+&#/\.[áéíóúÁÉÍÓÚü]+)\]/g;
var textAndUrl = /\[((.*))\]\(((http|https|ftp|ftps).+?)\)/g;

//Function to read the .mdfiles of an .md file only and returning the links and the properties of the links
const getLinksProperties = (path) => {
  var files = getMdFiles(path);
  console.log(files);
  var properties = [];
  files.forEach((fileInput) => {
    var insideFile = readFile(fileInput);
    var listLinks = insideFile.match(regexTextUrlGlobal);
    console.log("listLinks", listLinks);
    if (listLinks) {
      for (let i = 0; i < listLinks.length; i++) {
        const exec = regexTextUrl.exec(listLinks[i]);
        //console.log("exec",exec);
        let object = {
          href: exec[2],
          text: exec[1],
          file: fileInput
        }
      //console.log("object", object);
      //console.log("properties", properties);
      properties.push(object);
      }
    } else { // there are not links
      var object = {
        href: 'There are not links',
        text: '',
        file: fileInput
        }
        properties = object;
      }
  });
  return properties
}
      // lineLink.forEach((link) =>{
      //   const exec = regexTextUrl.exec(link);
      //   console.log(exec);
      //   //const href = link.match(regexUrl).join();
      //   //const text = link.match(regexText).join().slice(1, -1);
      //   exec.forEach((i) =>{
      //       let object = {
      //       href: exec[i[2]],
      //       text: exec[i[1]],
      //       file: fileInput
      //       }
      //       return listLinks = properties.push(object)
      //     });
      //   return listLinks
      // });

console.log(getLinksProperties(inputPath))


module.exports = {
  pathExists, 
  pathCheck,
  checkExt,
  checkDir,
  readDir,
  checkMarkdown,
  readFile,
  joinPath, 
  getMdFiles
};

//Function to get the array with .md files to analize and the errors in the route

// const getMdFiles = (path) => {
//   var mdFiles = [];
//   if (pathExists(path)) {
//       var routeAbsolute = pathCheck(path);
//       //console.log("ruta absoluta",routeAbsolute);
//       var dir = checkDir(routeAbsolute);
//       //console.log("es directorio?",dir);
//       var ext = checkExt(routeAbsolute);
//       if (dir) { //When it's a directory
//         var listFilesDir = readDir(routeAbsolute);
//         listFilesDir.forEach((dirFile) => {
//             var joinedPath = joinPath(routeAbsolute, dirFile);
//             var recheck = getMdFiles(joinedPath);
//             mdFiles = mdFiles.concat(recheck);
//         });
//         return mdFiles.length !== 0 ?mdFiles : 'The directory does not have files'
//       } if(ext) { //When it's a file
//         console.log(checkMarkdown(routeAbsolute));
//          if (checkMarkdown(routeAbsolute) == "true") { //When it's a .md
//             mdFiles = mdFiles.concat(routeAbsolute);
//             return mdFiles
//           } else {
//             return 'This is not an .md file, this program only checks md files'
//             // return 'This route does not have an md file and this program only checks md files'
//             }
//         } else {
//           return 'this is not a file or directory check and try again'
//         } 
//   } else {
//       //return mdFiles
//       return 'The input route does not exists or the file does not have any extension'
//   }
// };

//Function to get the array with .md files with errors
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



