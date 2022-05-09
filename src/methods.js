const path  = require('path');
const fs = require('fs');
const axios = require('axios');
const fetch = require('node-fetch');
const { Console } = require('console');

var inputPath = process.argv[2];

//------------------------Created methods------------------------//
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


//Returns the list of files in a directory
var readDir = (route) => fs.readdirSync(route, 'utf-8');
//console.log(readDir(inputPath));

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

//console.log(getMdFiles(inputPath));

///^(https:\/\/www\.|http:\/\/www\.|www\.)[a-zA-Z0-9\-_$]+\.[a-zA-Z]{2,5}$/g;
//var regexText = /\[([\w\s\d\-+&#/\.[áéíóúÁÉÍÓÚü]+)\]/g;

var regexTextUrlGlobal = /\[(.+?)\]\((https?.+?)\)/g;
var regexTextUrl = /\[(.*)\]\((.*)\)/;
var regexUrl = /https?:\/\/(www\.)?[A-z\d]+(\.[A-z]+)*(\/[A-z\?=&-\d]*)*/g;
var textAndUrl = /\[((.*))\]\(((http|https|ftp|ftps).+?)\)/g;

//Function to read the .mdfiles and returning the links and the properties of the links
const getLinksProperties = (path) => {
  var files = getMdFiles(path);
  //console.log("files", files);
  var linksArray = [];
  files.forEach((fileInput) => {
    var insideFile = readFile(fileInput);
    var listLinks = insideFile.match(regexTextUrlGlobal);
    //console.log("listLinks", listLinks);
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
      linksArray.push(object);
      }
    } else { // there are not links
       //console.log(" entra si no hay links");
      var object = {
        href: 'There are not links',
        text: '',
        file: fileInput
        }
        linksArray.push(object);
        //console.log("linksArray", linksArray)
      }
  });
  return linksArray
}

//console.log(getLinksProperties(inputPath));

//Function to get the status and case of each of the links objects
const fetchStatus = (path) => {
    const getStatus = getLinksProperties(path).map((element) => {
        const requestFetch = fetch(element.href)
            .then((response) => {
                const statusFetch = {
                    href: element.href,
                    text: element.text,
                    file: element.file,
                    status: response.status,
                    case: response.ok ? 'ok' : 'fail'
                }
                //console.log("response", response)
                //console.log("statusFetch",statusFetch)
                return statusFetch
            }).catch((error) => {
                const statusFetch = {
                    href: element.href,
                    file: element.file,
                    text: element.text,
                    status: 400,
                    case: 'fail',
                }
                return statusFetch
            })
        return requestFetch
    })
    return Promise.all(getStatus)
}

// console.log(fetchStatus(inputPath));

// fetchStatus(inputPath).then( (arrayProp) => {
//     console.log(arrayProp);
// });

//const linksDone = getLinksProperties(inputPath);

module.exports = {
  pathExists, 
  pathCheck,
  checkExt,
  checkDir,
  readDir,
  checkMarkdown,
  readFile,
  joinPath, 
  getMdFiles,
  getLinksProperties,
  fetchStatus
};
