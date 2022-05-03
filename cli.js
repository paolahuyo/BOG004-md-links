var options = {
    validate: false,
    stats: false
};

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
