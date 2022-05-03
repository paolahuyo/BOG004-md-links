const methods = require ("./methods.js");
const cli = require ("./cli.js");

var inputPath = process.argv[2];

const mdlinks = (routeInput, optionsInput = {}) => {
  //console.log("entro a la funcion");
  //console.log(routeInput);
  //console.log(optionsInput.validate);
  return new Promise((resolve, reject) => {
    console.log("entro a la promesa");
    console.log("Existencia de la ruta", methods.pathExists(routeInput));
      if (!methods.pathExists(routeInput)) {
          console.log("no existe ruta");
          reject()
      } else {
          console.log("La ruta existe");
          console.log("Option Validate",optionsInput.validate);
          if (!optionsInput.validate) {
              const validGetLinks = methods.getMdFiles(routeInput) !== '' 
              ? console.log(methods.getLinksProperties(routeInput))
              : console.log('There are not md files');
              resolve(validGetLinks)
          } else {
              console.log("Validate True");
              const validFetchStatus = methods.getMdFiles(routeInput) !== '' 
              ? methods.fetchStatus(routeInput)
              : console.log('There are not md files');
              resolve(validFetchStatus)
          }
      }
  });
}

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