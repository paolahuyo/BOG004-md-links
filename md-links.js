const methods = require ("./methods.js");
const cli = require ("./cli.js");

var inputPath = process.argv[2];

const mdlinks = (routeInput, optionsInput = {}) => {
  //console.log("entro a la funcion");
  //console.log(routeInput);
  //console.log(optionsInput.validate);
  return new Promise((resolve, reject) => {
    //console.log("entro a la promesa");
    //console.log("Existencia de la ruta", methods.pathExists(routeInput));
      if (!methods.pathExists(routeInput)) { //The route does not exist
          reject()
      } else { //the route exists
          console.log("Option Validate",optionsInput.validate);
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
mdlinks(inputPath, cli.inputOptions())
.then((objectProperties)=>{
  console.log(objectProperties);
})
.catch(()=>{
  console.log("La ruta no existe");
});

module.exports = {
  mdlinks
}