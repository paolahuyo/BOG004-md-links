const mdlinks = require('./md-links');

var inputPath = process.argv[2];
var moreOptions = process.argv[3];

var options = {
    validate: false,
    stats: false
};

//Function that fills the object inputOptions with options
var inputOptions = () =>{
    if (process.argv.includes('--validate')){
        options.validate = true;
    } if (process.argv.includes('--stats')){
        options.stats = true;
    }
    return options
}

console.log("Objeto de opciones en cli:", inputOptions());
console.log("Path de entrada:",inputPath);

// mdlinks(inputPath, inputOptions())
// .then((objectProperties)=>{
//   console.log(objectProperties);
// })
// .catch(()=>{
//   console.log("La ruta no existe");
// });

// const evaluateCli = (path, options = {}) => {
//     if (!moreOptions){
//         console.log("You Should enter a valid option: --validate or/and --stats to evaluate links of .md files")
//     } else {
//         if (options.validate) { // When the options have --validate
//             console.log("Enter validate");
//             mdlinks(path, inputOptions()).then((res) => {
//                 const uniqueLinks = {};
//                 const brokenlinks = [];
//                 res.forEach((linkObject) => {
//                     if (linkObject.status >= 400) {
//                         brokenlinks.push(linkObject.status);
//                     }
//                     uniqueLinks[linkObject.href] = uniqueLinks[linkObject.href]
//                     ? uniqueLinks[linkObject.href] + 1 : 1;
//                 });
//                 if (options.stats) { //When the option has validate and also has --stats
//                     console.log("Total:", res.lenght);
//                     console.log("Unique:", Object.keys(uniqueLinks).lenght);
//                     console.log("Broken:", brokenlinks.lenght);
//                 } else { //When the option has --validate but hasn't --stats
//                     res.forEach((linkObject) => {
//                         const dataStatus = `${(inputPath)} ${(linkObject.href)} ${(linkObject.status,linkObject.case)} ${(linkObject.text)}`
//                         const noLinks = `${(inputPath)} ${(linkObject.href)}`
//                         console.log(linkObject.href === 'There are not links' ? noLinks : dataStatus);
//                     })
//                 } 
//             })
//             .catch((err) => {
//                 console.log(err);
//             })   // Finish the case when the input has --validate
//         } else if (options.stats) { //When the option only has --stats
//             console.log("Enter stats");
//             mdlinks(path, inputOptions())
//                 .then((res) => {
//                     const uniqueLinks = {};
//                     res.forEach((linkObject) => {
//                         uniqueLinks[linkObject.href] = uniqueLinks[linkObject.href]
//                         ? uniqueLinks[linkObject.href] + 1 : 1;
//                     })
//                     console.log('Total:', res.length);
//                     console.log('Unique:', Object.keys(uniqueLinks).length);
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 })

//         }
//     }
// }

// evaluateCli(inputPath, inputOptions())

// const evaluateCli = (inputPath, inputOptions = {}) => {
//     if (!moreOptions){
//         console.log("You Should enter a valid option: --validate or/and --stats to evaluate links of .md files")
//     } else {
//         if (inputOptions.validate) { // When the options have --validate
//             mdlinks(inputPath, inputOptions())
//             .then((res) => {
//                 const uniqueLinks = {};
//                 const brokenlinks = [];
//                 res.forEach((linkObject) => {
//                     if (linkObject.status >= 400) {
//                         brokenlinks.push(linkObject.status);
//                     }
//                     uniqueLinks[linkObject.href] = uniqueLinks[linkObject.href]
//                     ? uniqueLinks[linkObject.href] + 1 : 1;
//                 });
//                 if (inputOptions.stats) { //When the option has validate and also has --stats
//                     console.log("Total:", res.lenght);
//                     console.log("Unique:", Object.keys(uniqueLinks).lenght);
//                     console.log("Broken:", brokenlinks.lenght);
//                 } else { //When the option has --validate but hasn't --stats
//                     res.forEach((linkObject) => {
//                         const dataStatus = `${(inputPath)} ${(linkObject.href)} ${(linkObject.status,linkObject.case)} ${(linkObject.text)}`
//                         const noLinks = `${(inputPath)} ${(linkObject.href)}`
//                         console.log(linkObject.href === 'There are not links' ? noLinks : dataStatus);
//                     })
//                 } 
//             })
//             .catch((err) => {
//                 console.log(err);
//             })   // Finish the case when the input has --validate
//         } else if (inputOptions.stats) { //When the option only has --stats
//             mdlinks(inputPath, inputOptions())
//                 .then((res) => {
//                     const uniqueLinks = {};
//                     res.forEach((linkObject) => {
//                         uniqueLinks[linkObject.href] = uniqueLinks[linkObject.href]
//                         ? uniqueLinks[linkObject.href] + 1 : 1;
//                     })
//                     console.log('Total:', res.length);
//                     console.log('Unique:', Object.keys(uniqueLinks).length);
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 })

//         }
//     }
// }

// evaluateCli(inputPath, inputOptions())

module.exports = {
    inputOptions
}