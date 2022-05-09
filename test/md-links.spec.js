const mdLinks = require('../md-links');
const cli = require("../cli.js");
const methods = require("../methods.js");

describe('Checking path, pathExists', () => {
  it('Is gonna validate if the path exists', () => {
    expect(methods.pathExists('./md-files/no-md-files/errorfile.txt')).toBeTruthy()
    expect(methods.pathExists('./md-files/fakefile.txt')).not.toBeTruthy()
  });
});

describe('Checking the path type, pathCheck', () => {
  it('Checking if the path is an absolute path, if not it converts the path to absolute', () => {
    const absolutePathone = '/Users/paolahuyo/PROYECTOS-LABORATORIA/BOG004-md-links/md-files';
    const absolutePathtwo = '/Users/paolahuyo/PROYECTOS-LABORATORIA/BOG004-md-links/md-files/no-md-files';
    expect(methods.pathCheck('md-files')).toBe(absolutePathone)
    expect(methods.pathCheck(absolutePathone)).toBe(absolutePathone)
    expect(methods.pathCheck('md-files/no-md-files')).toBe(absolutePathtwo)
    expect(methods.pathCheck(absolutePathtwo)).toBe(absolutePathtwo)
  });
});

describe('Checking the extension, checkExt', () => {
  it('Checks the extension of the file', () => {
    const dirExtension = methods.checkExt('md-files/dir-mdwithlinks');
    const fileExtension = methods.checkExt('md-files/series-errors.md');
    const fileExcluded = methods.checkExt('/Users/paolahuyo/PROYECTOS-LABORATORIA/BOG004-md-links/md-files/no-md-files/errorfile.txt');
    expect(dirExtension).toBeFalsy()
    expect(fileExtension).toBe('.md')
    expect(fileExcluded).toBe('.txt')
  });
});

describe('Check if the path is a directory, checkDir', ()=>{
  it('Evaluates checkDir', () =>{
    expect(methods.checkDir('md-files/dir-mdwithlinks')).toBeTruthy()
    expect(methods.checkDir('md-files/nolink.md')).toBeFalsy()
  });
});

// describe('Returns list of files in the directory, readDir', () =>{
//   it('Gives list of files', () => {
//     const listFilesOne = [ 'laboratoria-links.md', 'other-links.md' ];
//     const listFilesTwo = [ 'dir-md-links', 'dir-mdwithlinks', 'file-noextension', 'no-md-files', 'nolink.md', 'series-errors.md', 'series.md' ];
//     expect(methods.readDir('/Users/paolahuyo/PROYECTOS-LABORATORIA/BOG004-md-links/md-files/dir-mdwithlinks').toBe(listFilesOne))
//     expect(methods.readDir('/Users/paolahuyo/PROYECTOS-LABORATORIA/BOG004-md-links/md-files').toBe(listFilesTwo))
//   })
// })

describe('Reads a file', () => {
  it('readFile', () => {
    const textFile = methods.readFile('/Users/paolahuyo/PROYECTOS-LABORATORIA/BOG004-md-links/md-files/no-md-files/errorfile.txt');
    expect(typeof textFile).toBe('string')
    expect(textFile).toBe('Esta es una prueba para revisar el funcionamiento del código')
  });
});


// describe('mdLinks', () => { 

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
