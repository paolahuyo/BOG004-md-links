# MARKDOWN LINKS

## Index

### User Manual 
* [1. Installation Guide](#1-Installation-Guide)
* [2. User Manual](#2-User-Manual)
* [3. Examples](#3-Examples)

### Development Planning
* [3. Development Process](#3-Development-Process)
* [4. GitHub Projects](#4-GitHub-Projects)
* [5. User Stories](#4-User-Stories)

***

### 1) Installation Guide

* The user **can install the mdlinks module** directly with `npm install @paolahuyo/md-links`. This module has an _executable_ that the user can call in cli as an interface to import with `require` to be used programmaticaly.

  ### Folders and Files

* `ReadMe-mdlinks.md` module description, user manual and installation guide,
  documentation and examples. Development process and files.
* `src`: Directory with the executable js files, function to get the options, modules with methods for the function mdLinks and evaluateCli function (`methods.js, cli.js and md-links.js`).
* `methods.js` Created functions with node modules fs, path and node-fetch for the function `mdLinks`.
* `md-links.js` executable js that calls the modules used ( clc, methods and cli)
* `cli.js`. Created function to get the options that the user writes
* `md-files` Directory with different types of files to test and try the module mdlinks
* `test` Different types of tests to check the correct functionability of the module mdlinks
* `__mocks__` mock of the module node-fecth to make the test of fecthStatus

### 2) User Manual

The module can be used executing the app as follows through the **terminal**:

`md-links <path-to-file> [options]`

* `<path-to-file>`: **Absolute** or **relative** path to the **file** or **directory**.
If the path written is relative, the module resolves to relative to the directory

* `[options]`: 
Options can be --validate, --stats or both

If the user doesn't write an option the output is going to be this one:

Example:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

The default behavior doesn't validate if the URLs respond ok or not,
it just identify the markdown file (from the path written as an
argument), parse the Markdown file and print the links that find, along with the file path where it appears and the text inside the link (truncated to 50 characters).

#### Options

##### `--validate`

If the user writtes the `--validate` option, the module makr an HTTP request to
find out if the link works or not. If the link results in a redirect to a
URL that responds ok and the module consider the link as ok.

Example:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

In this case the _output_ includes the word `ok` or `fail` after
the URL, as well as the status of the response received to the HTTP request to that
URLs.

##### `--stats`

If the user writtes the `--stats` option the output will be a text with statistics

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

The user can also writte the combination of `--stats` and `--validate` to get statistics that
need the validation results.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```
## 3. Examples





***

# Development Planning

## 4.Development Process 

The project aims to develop a node application that reads and analizes `Markdown` files to validate the links that are inside of them and to show statistics of those files. For a better understanding of the project I started with a flowchart, in it there are different functions that are better know as methods to analize the path and with that information the app is developed. After that I had to develop the mdlinks(path, validate:true or false) function to get the output as a promise result acording to the cases. After that I developed a function called evaluateCli that calls the mdlinks function and integrate the option --validate, --stats and --stats && --validate.

This project was made as a CLI tool and as a Javascript library.

### Flowchart

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FhDvwKquJDirVtxmZttWwpk%2FDIAGRAMA-DE-FLUJO-MDLINKS%3Fnode-id%3D59%253A161" allowfullscreen></iframe>

(https://www.figma.com/file/hDvwKquJDirVtxmZttWwpk/DIAGRAMA-DE-FLUJO-MDLINKS?node-id=59%3A161)

## 5. GitHub Projects

I used agile method and the app was developed in 3 sprints, for each sprint I determined issues to be done and tasks for each of the issues that are consigned in GitHub Projects.

### Milestones
1rst Sprint: I made the research, flowchart and I started studying node methods
2nd Sprint: I created the methods to call in mdLinks, the mdLink and evaluateCli functions and also i tested by cli the results for different path cases.
3rd Sprint: The result for mostly of the cases were good, but I got a bug when the user enter a a path only without options, so I had to change the code to improve the bug. I made de tests and I integrate colors to the outputs.

### Issues 

(https://github.com/paolahuyo/BOG004-md-links/projects/3)

## 6. User Stories

1. The user doesn't write a path
2. The user writes a path but doesn't write any option
3. The user writes a relative or absolute path with a .md file and option --validate or --stats
4. The user writes a relative or absolute path with a .md file and option --validate and --stats
5. The user writes a relative or absolute path without an .md file and option --validate or --stats
6. The user writes a path any type of path that contains all the types of files (directories, files  without extensions, md with links, md without links) and option --validate or --stats
7. The user writes a path any type of path that contains a directory with all the types of files (directories, files  without extensions, md with links, md without links) and option --validate and --stats

#### ¿Cómo hago para que mi módulo sea _instalable_ desde GitHub?

Para que el módulo sea instalable desde GitHub solo tiene que:

* Estar en un repo público de GitHub
* Contener un `package.json` válido

Con el comando `npm install githubname/reponame` podemos instalar directamente
desde GitHub. Ver [docs oficiales de `npm install` acá](https://docs.npmjs.com/cli/install).

