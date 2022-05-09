const mdLinks = require('../md-links');
const cli = require ("../cli.js");
const methods = require ("../methods.js");

describe('pathExists', () => {
  it('Is gonna validate if the path exists', () => {
    expect(methods.pathExists('./md-files/no-md-files/errorfile.txt')).toBeTruthy()
    expect(methods.pathExists('./md-files/fakefile.txt')).not.toBeTruthy()
  });
});

// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
