# MARKDOWN LINKS

## Index

* [1. Development Process](#1-Development-Process)
* [2. GitHub Projects](#2-GitHub-Projects)
* [3. User Stories](#3-User-Stories)
* [4. Instructions](#4-Instructions)
* [5. Criterios de aceptación mínimos del proyecto](#5-criterios-de-aceptación-mínimos-del-proyecto)
* [6. Entregables](#6-entregables)
* [7. Hacker edition](#7-hacker-edition)
* [8. Pistas, tips y lecturas complementarias](#8-pistas-tips-y-lecturas-complementarias)
* [9. Checklist](#9-checklist)
* [10. Achicando el problema](#10-achicando-el-problema)

***

# Development Plan

## 1.Development Process 

The project aims to develop a node application that reads and analizes `Markdown` files to validate the links that are inside of them and to show statistics of those files. For a better understanding of the project I started with a flowchart, in it there are different functions that are better know as methods to analize the path and with that information the app is developed. After that I had to develop the mdlinks(path, validate:true or false) function to get the output as a promise result acording to the cases. After that I developed a function called evaluateCli that calls the mdlinks function and integrate the option --validate, --stats and --stats && --validate.

This project was made as a CLI tool and as a Javascript library.

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FhDvwKquJDirVtxmZttWwpk%2FDIAGRAMA-DE-FLUJO-MDLINKS%3Fnode-id%3D59%253A161" allowfullscreen></iframe>

(https://www.figma.com/file/hDvwKquJDirVtxmZttWwpk/DIAGRAMA-DE-FLUJO-MDLINKS?node-id=59%3A161)

## 2. GitHub Projects

I used agile method and the app was developed in 3 sprints, for each sprint I determined issues to be done and tasks for each of the issues that are consigned in GitHub Projects.

### Milestones
1rst Sprint: I made the research, flowchart and I started studying node methods
2nd Sprint: I created the methods to call in mdLinks, the mdLink and evaluateCli functions and also i tested by cli the results for different path cases.
3rd Sprint: The result for mostly of the cases were good, but I got a bug when the user enter a a path only without options, so I had to change the code to improve the bug. I made de tests and I integrate colors to the outputs.

### Issues 

(https://github.com/paolahuyo/BOG004-md-links/projects/3)

## 3. User Stories

1. The user doesn't write a path
2. The user writes a path but doesn't write any option
3. The user writes a relative or absolute path with a .md file and option --validate or --stats
4. The user writes a relative or absolute path with a .md file and option --validate and --stats
5. The user writes a relative or absolute path without an .md file and option --validate or --stats
6. The user writes a path any type of path that contains all the types of files (directories, files  without extensions, md with links, md without links) and option --validate or --stats
7. The user writes a path any type of path that contains a directory with all the types of files (directories, files  without extensions, md with links, md without links) and option --validate and --stats

### Examples

















## 4. Instructions

* Este proyecto se debe "resolver" de manera individual.

* La **librería** y el **script ejecutable** (herramienta de línea de comando -
  CLI) deben estar implementados en JavaScript para ser ejecutados con
  Node.js. **Está permitido usar librerías externas**.

* Tu módulo **debe ser instalable** via `npm install <github-user>/md-links`. Este
  módulo debe incluir tanto un _ejecutable_ que podamos invocar en la línea de
  comando como una interfaz que podamos importar con `require` para usarlo
  programáticamente.

* Los **tests unitarios** deben cubrir un mínimo del 70% de _statements_,
  _functions_, _lines_ y _branches_. Te recomendamos explorar [Jest](https://jestjs.io/)
  para tus pruebas unitarias.

* Para este proyecto **no está permitido** utilizar `async/await`.

* Para este proyecto es **opcional** el uso de ES Modules `(import/export)`, en el
  caso optes utilizarlo deberás de crear un script de `build` en el `package.json`
  que los transforme en `requires` y `module.exports` con ayuda de **babel**.

## 5. Criterios de aceptación mínimos del proyecto



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


## Este proyecto consta de DOS partes

### 1) JavaScript API

El módulo debe poder **importarse** en otros scripts de Node.js y debe ofrecer la
siguiente interfaz:

#### `mdLinks(path, options)`

##### Argumentos

* `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
Si la ruta pasada es relativa, debe resolverse como relativa al directorio
desde donde se invoca node - _current working directory_).
* `options`: Un objeto con **únicamente** la siguiente propiedad:
  - `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Valor de retorno

La función debe **retornar una promesa** (`Promise`) que **resuelva a un arreglo**
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades

Con `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

#### Ejemplo (resultados como comentarios)

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```

### 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la **terminal**:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## 6. Entregables

Módulo instalable via `npm install <github-user>/md-links`. Este módulo debe
incluir tanto **un ejecutable** como **una interfaz** que podamos importar con `require`
para usarlo programáticamente.

## 7. Hacker edition

Las secciones llamadas _Hacker Edition_ son **opcionales**. Si **terminaste**
con todo lo anterior y te queda tiempo, intenta completarlas. Así podrás
profundizar y/o ejercitar más sobre los objetivos de aprendizaje del proyecto.

* Puedes agregar la propiedad `line` a cada objeto `link` indicando en qué línea
  del archivo se encontró el link.
* Puedes agregar más estadísticas.
* Integración continua con Travis o Circle CI.

***

## 8. Pistas, tips y lecturas complementarias

### FAQs

#### ¿Cómo hago para que mi módulo sea _instalable_ desde GitHub?

Para que el módulo sea instalable desde GitHub solo tiene que:

* Estar en un repo público de GitHub
* Contener un `package.json` válido

Con el comando `npm install githubname/reponame` podemos instalar directamente
desde GitHub. Ver [docs oficiales de `npm install` acá](https://docs.npmjs.com/cli/install).

Por ejemplo, el [`course-parser`](https://github.com/Laboratoria/course-parser)
que usamos para la currícula no está publicado en el registro público de NPM,
así que lo instalamos directamente desde GitHub con el comando `npm install
Laboratoria/course-parser`.

### Sugerencias de implementación
