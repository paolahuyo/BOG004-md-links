const methods = require ("./methods.js");
const cli = require ("./cli.js");
const { response } = require("express");
var clc = require("cli-color");
const { links } = require("express/lib/response");

var inputPath = process.argv[2];
var moreOptions = process.argv[3];
//Variables to color outputs
var clcValues = clc.yellow;
var clcNotice = clc.cyanBright.bold;
var clcError = clc.redBright.blink;
var clcGreen = clc.green;

const mdLinks = (routeInput, optionsInput = {}) => {
  //console.log("entro a la funcion");
  //console.log(routeInput);
  //console.log(optionsInput.validate);
  return new Promise((resolve, reject) => {
    //console.log("entro a la promesa");
    //console.log("Existencia de la ruta", methods.pathExists(routeInput));
      if (!methods.pathExists(routeInput)) { //The route does not exist
          reject()
      } else { //the route exists
          //console.log("Option Validate",optionsInput.validate);
          if (!optionsInput.validate) { //When the option validate is false - is notwritten
              const validGetLinks = methods.getMdFiles(routeInput) !== '' 
              ? methods.getLinksProperties(routeInput)
              : console.log('There are not md files');
              resolve(validGetLinks)
          } else { //When the option validate is true - is written
              //console.log("Validate True");
              const validFetchStatus = methods.getMdFiles(routeInput) !== '' 
              ? methods.fetchStatus(routeInput)
              : console.log('There are not md files');
              resolve(validFetchStatus)
          }
      }
  });
}

//-----------Checking the promise of the function mdlinks on .then and .catch--------------///
// mdLinks(inputPath, cli.inputOptions())
// .then((objectProperties)=>{
//   console.log(objectProperties);
// })
// .catch(()=>{
//   console.log("La ruta no existe");
// });

//----------- Function that evaluates the path and the options and returns the final output --------------///
const evaluateCli = (path, options = {}) => {
  if (!moreOptions){
      //console.log("You Should enter a valid option: --validate or/and --stats to evaluate links of .md files")
  } else {
      if (options.validate) { // When the options have --validate
          //console.log("Enter validate");
          mdLinks(inputPath, cli.inputOptions()).then((res) => {
              const uniqueLinks = {};
              const brokenlinks = [];
              res.forEach((linkObject) => {
                  if (linkObject.status >= 400) {
                      brokenlinks.push(linkObject.status);
                      //console.log("Broken links:",brokenlinks);
                  }
                  //console.log("Unique links",uniqueLinks[linkObject.href]);
                  uniqueLinks[linkObject.href] = uniqueLinks[linkObject.href]
                  ? uniqueLinks[linkObject.href] + 1 : 1;
              });
              //console.log(options.stats);
              if (options.stats) { //When the option has validate and also has --stats
                  console.log(clcNotice("Total:"),res.length);
                  console.log(clcNotice("Unique:"),Object.keys(uniqueLinks).length);
                  console.log(clcError("Broken:"),clcError(brokenlinks.length));
              } else { //When the option has --validate but hasn't --stats
                  res.forEach((linkObject) => {
                      const dataStatus = `${clcNotice(inputPath)} ${clcValues(linkObject.href)} ${linkObject.status >= 400 ? clcError(linkObject.status, linkObject.case) : clcGreen(linkObject.status, linkObject.case)} ${clcValues(linkObject.text)}`
                      const noLinks = `${clcNotice(inputPath)} ${clcValues(linkObject.href)}`
                      console.log(linkObject.href === 'There are not links' ? noLinks : dataStatus);
                  })
              } 
          })
          .catch((err) => {
              console.log(clcError(err));
          })   // Finish the case when the input has --validate
      } else if (options.stats) { //When the option only has --stats
          //console.log("Enter stats");
          mdLinks(inputPath, cli.inputOptions())
            .then((res) => {
              const uniqueLinks = {};
              res.forEach((linkObject) => {
                uniqueLinks[linkObject.href] = uniqueLinks[linkObject.href]
                ? uniqueLinks[linkObject.href] + 1 : 1;
              })
              console.log(clcNotice('Total:'), res.length);
              console.log(clcNotice('Unique:'), Object.keys(uniqueLinks).length);
            })
            .catch((err) => {
              console.log(clcError(err));
            })
      }
  }
}

evaluateCli(inputPath, cli.inputOptions())

module.exports = {
  mdLinks
}
