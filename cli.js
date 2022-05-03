const res = require("express/lib/response");
const { mdlinks } = require("./md-links");

var options = {
    validate: false,
    stats: false
};

var inputPath = process.argv[2];
var moreOptions = process.argv[3];

var inputOptions = () =>{
    if (process.argv.includes('--validate')){
        options.validate = true;
    } if (process.argv.includes('--stats')){
        options.stats = true;
    }
    return options
}

console.log("Objeto de opciones en cli", inputOptions());

module.exports = {
    inputOptions
}

const evaluateCli = () => {
    if (!moreOptions){
        console.log("You Should enter a valid option: --validate or/and --stats to evaluate links of .md files")
    } else {
        if (optionsInput.validate) { // When the options have --validate
            mdlinks(inputPath, cli.inputOptions())
            .then((res) => {
                const uniqueLinks = {};
                const brokenlinks = [];
                res.forEach((linkObject) => {
                    if (linkObject.status >= 400) {
                        brokenlinks.push(linkObject.status);
                    }
                    uniqueLinks[linkObject.href] = uniqueLinks[linkObject.href]
                    ? uniqueLinks[linkObject.href] + 1 : 1;
                    
                });
            })
        } if (optionsInput.stats) { //When the options have --stats
            console.log("Total:", res.lenght);
            console.log("Unique:", Object.keys(uniqueLinks).lenght);
            console.log("Broken:", brokenlinks.lenght);
            } else {
                res.forEach((linkObject) => {
                    const dataStatus = `${(inputPath)} ${(linkObject.href)} ${(linkObject.status,linkObject.case)} ${(linkObject.text)}`
                    const noLinks = `${(inputPath)} ${(linkObject.href)}`
                    console.log(linkObject.href === 'There are not links' ? noLinks : dataStatus);

                })
            }






    }
}


evaluateCli()