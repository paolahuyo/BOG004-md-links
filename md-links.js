const methods = require ("./methods.js");
// const cli = require ("./cli.js");

// var inputPath = process.argv[2];

// const mdlinks = (inputPath, inputOptions = {}) => {
//   return new Promise((resolve, reject) => {
//       if (!methods.pathExists(path)) {
//           reject('The route does not exists')
//       } else {
//           if (options.validate == "true") {
//               console.log("validate option is written")
//               const validGetLinks = methods.getMdFiles(path) !== '' ? methods.getLinksProperties(path) : 'There are not md files'
//               resolve(validGetLinks)
//           } else {
//               const validFetchStatus = methods.getMdFiles(path) !== '' ? methods.fetchStatus(path) : 'There are not md files'
//               resolve(validFetchStatus)
//           }
//       }
//   });
// }
