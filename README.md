## MARKDOWN LINKS (Paola Huyo - Laboratoria BOG004)

---

## Index

### Users Manual
* [1. Installation Guide](#1-Installation-Guide)
* [2. User Manual](#2-User-Manual)
* [3. Examples](#3-Examples)

### Development Planning
* [4. Process](#4-Process)
* [5. GitHub Project](#5-GitHub-Project)
* [6. User Stories](#6-User-Stories)

***

### 1) Installation Guide

* The user **can install the mdlinks module** directly with `npm install @paolahuyo/md-links`. This module has an _executable_ that the user can call in cli as an interface to import with `require` to be used programmatically.

  ### Folders and Files

* `README.md` module description, user manual and installation guide,
  documentation, and examples. Development process and files.
* `src`: Directory with the executable js files, function to get the options, modules with methods for the function mdLinks and evaluateCli function (`methods.js, cli.js and md-links.js`).
* `methods.js` Created functions with node modules fs, path, and node-fetch for the function `mdLinks`.
* `md-links.js` executable js that calls the modules used ( clc, methods, and cli)
* `cli.js`. Created function to get the options that the user writes
* `md-files` Directory with different types of files to test and try the module mdlinks
* `test` Different types of tests to check the correct functionality of the module mdlinks
* `__mocks__` mock of the module node-fetch to make the test of fetchStatus

### 2) User Manual

The module can be used to execute the app as follows through the **terminal**:

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
it just identifies the markdown file (from the path written as an
argument), parse the Markdown file and print the links that find, along with the file path where it appears and the text inside the link (truncated to 50 characters).

#### Options

##### `--validate`

If the user writes the `--validate` option, the module makes an HTTP request to
find out if the link works or not. If the link results in a redirect to a
URL that responds ok and the module considers the link as ok.

Example:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

In this case, the _output_ includes the word `ok` or `fail` after
the URL, as well as the status of the response, received to the HTTP request to that
URLs.

##### `--stats`

If the user writes the `--stats` option the output will be a text with statistics

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

The user can also write the combination of `--stats` and `--validate` to get statistics that
need the validation results.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```
## 3. Examples

1. `md-links <path-to-file>`
![no options](https://i.imgur.com/ZaookO0.png)
2. `md-links <path-to-file> [options: --validate]`
![--validate](https://i.imgur.com/UfjuYRL.png)
3. `md-links <path-to-file> [options: --stats]`
![--stats](https://i.imgur.com/qeTiOna.png)
4. `md-links <path-to-file> [options: --validate --stats]`
![--validate && --stats](https://i.imgur.com/IEYOrPO.png)

***

# Development Planning

## 4. Process 

The project aims to develop a node application that reads and analyzes `Markdown` files to validate the links that are inside of them and to show statistics of those files. For a better understanding of the project I started with a flowchart, in it, different functions are better known as methods to analyze the path and with that information, the app is developed. After that, I had to develop the mdlinks(path, validate: true or false) function to get the output as a promise result according to the cases. After that I developed a function called evaluateCli that calls the mdlinks function and integrate the option --validate, --stats and --stats && --validate.

This project was made as a CLI module and as a Javascript library.

### Flowchart

`<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FhDvwKquJDirVtxmZttWwpk%2FDIAGRAMA-DE-FLUJO-MDLINKS%3Fnode-id%3D59%253A161" allowfullscreen></iframe>`

[FIGMA FLOWCHART](https://www.figma.com/file/hDvwKquJDirVtxmZttWwpk/MDLINKS-Flowchart?node-id=0%3A1)

## 5. GitHub Project

I used the agile method and the app was developed in 3 sprints, for each sprint I determined issues to do and tasks for each of the issues that are consigned in GitHub Projects.

If you want to check the whole process, check this link [GitHub Project mdlinks @paolahuyo](https://github.com/paolahuyo/BOG004-md-links/projects/3)

### Issues 

If you want to check the issues, check this link [GitHub Issues mdlinks @paolahuyo](https://github.com/paolahuyo/BOG004-md-links/issues?q=is%3Aissue+is%3Aclosed)

### Milestones

If you want to check the milestones, check this link [GitHub Milestones mdlinks @paolahuyo](https://github.com/paolahuyo/BOG004-md-links/milestones)
- [X] 1rst Sprint: I made the research, flowchart and I started studying node methods
- [X] 2nd Sprint: I created the methods to call in mdLinks, mdLinks, and evaluateCli functions and also I tested by cli terminal the results for different path cases with node md-links.
- [X] 3rd Sprint: The results for most cases were correct, but I got a bug when the user enter a path only without options, so I had to change the code to improve the bug. I made the tests and I integrated colors into the outputs.

## 6. User Stories

I determined these user stories thinking of the multiple cases of the user input, I created files and directories in the folder in md-files to check each of the functions and methods in the whole code. 

1. The user doesn't write a path
2. The user writes a path but doesn't write any option
3. The user writes a relative or absolute path with a .md file and option --validate or --stats
4. The user writes a relative or absolute path with a .md file and option --validate and --stats
5. The user writes a relative or absolute path without a .md file and option --validate or --stats
6. The user writes a path any type of path that contains all the types of files (directories, files  without extensions, .md with links, .md without links) and option --validate or --stats
7. The user writes a path any type of path that contains a directory with all the types of files (directories, files  without extensions, .md with links, .md without links) and option --validate and --stats