var options = {
    validate: false,
    stats: false
};

//Function that fills the object inputOptions with options
var inputOptions = () => {
    if (process.argv.includes('--validate')) {
        options.validate = true;
    } if (process.argv.includes('--stats')) {
        options.stats = true;
    }
    return options
}

//console.log(inputOptions())

module.exports = {
    inputOptions
}