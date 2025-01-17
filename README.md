# MD-LINKS

Md-links es una libreria que lee y analiza los links que estan dentro de los archivos .md para asi reportar algunas estadisticas.

## Pruebas Unitarias

Para las pruebas unitarias utilizamos Jest.

## Instalación:

Para instalar esta librería debes ejecutar la siguiente linea de comando: `$ npm i md-links-rocio-sulca`. 
También puedes importarlo con require para usarlo programáticamente : `const mdLinks = require('md-links-rocio-sulca')`;

## Diagrama de flujo:

El [diagrama de flujo](https://lucid.app/documents/view/d2ff7955-7946-43b8-8880-e0b3f0337faf) para la implementación de la solución de md-Links.

## Guia de uso:

#### Options:

`path`
Esta línea de comando te permite ver todos los links sin la validación.
![sin comando](img/path.JPG)

`path, --validate`
Esta línea de comando te permite ver los datos estadísticos de los links.
![comando validate](img/pathvalidate.JPG)

`path, --stats`
Esta línea de comando te permite saber cuantos links hay en total en el archivo y cuantos son unicos.
![comando stats](img/pathstats.JPG)

`path, --validate, --stats`
Esta línea de comando te permite saber cuantos links hay en total en el archivo, cuantos son unicos y cuantos links rotos hay.
![comando validate y stats](img/pathvalidatestats.JPG)

`path, --help`
Esta linea de comando es si se desea ayuda  
![comando help](img/pathhelp.JPG)




