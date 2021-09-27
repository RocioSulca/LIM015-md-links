const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fetch = require('node-fetch');

// *Confirmar si la ruta existe*

const pathExist = (isAPath) => fs.existsSync(isAPath);

// *Comprobar si la ruta un archivo*

const isAFile = isAPath => fs.lstatSync(isAPath).isFile();

// *Verificar si es una ruta absoluta y resolverlo*

const isAbsolute = isAPath => (path.isAbsolute(isAPath) ? isAPath : path.resolve(isAPath));

// *Para leer un archivo de un directorio*

const readAllFiles = (isAPath) => fs.readFileSync(isAPath, 'utf8');

// *Para verificar que la extension del archivo sea md*

const isMd = (isAPath) => path.extname(isAPath) === '.md';

// *Funcion para extraer archivos md y guardarlo en un array*

const searchFileMd = (route) => {
    let arrayFileMd = [];

    if( isAFile(route)) {
        if(isMd(route)) {
            arrayFileMd.push(route);
        }
    } else {
        const listOfFiles = fs.readdirSync(route);
        listOfFiles.forEach((file) => {
            const pathFile = path.join(route, file);
            arrayFileMd = arrayFileMd.concat(searchFileMd(pathFile));
        });
    }
    return arrayFileMd;
};

// *Funcion para recorrer los links de los archivos md*

const readLinksMd = (file) => {
    const arrayLinksMd = [];
    const arrFile = searchFileMd(file);
    arrFile.forEach((pathFile) => {
        const readFileMd = readAllFiles(pathFile);
        const renderer = new marked.Renderer();
        renderer.link = (url, texto, urlText) => {
            arrayLinksMd.push(
                {
                    href: url,
                    text: urlText.substring(0, 50),
                    pathFile: pathFile
                }
            );
        };
        marked(readFileMd, { renderer});
    });
    return arrayLinksMd;
};

// console.log(readLinksMd('./Pruebaa/'));

const validateLink = (links) => fetch(links.href)
    .then((response) => {
        if(response.status >= 200 && response.status < 400) {
            return {
                ...links,
                status: response.status,
                statusText: response.statusText
            };
        }
        return {
            ...links,
            status: response.status,
            statusText: 'FAIL'
        };
    }) 
    .catch(() => {
        return {
            ...links,
            status: 'ERR',
            statusText: 'FAIL'
        };                                                                      
    });

// STATS

// Funcion de enlaces unicos
const uniqueLink = (arrayLink) => {
    const uniquesLinks = new Set(arrayLink.map((link) => link.href));
    const unique = `\nUnique: ${uniquesLinks.size}`;
    return unique;
};

// Funcion de enlaces rotos
const brokenLink = (arrayLink) => {
    const brokenLinks = arrayLink.filter((link) => link.statusText === 'FAIL');
    const stats = `\nBroken: ${brokenLinks.length}`;
    return stats;
};

const totalLink  = (arrayLink) => {
    const totalElementosArray = arrayLink.map(link => link.href);
    const total = `\nTotal: ${totalElementosArray.length}`;
    return total;
};

module.exports = {
    searchFileMd,  
    isAbsolute,    
    pathExist,     
    isAFile,       
    readAllFiles,  
    isMd,          
    readLinksMd,   
    validateLink,  
    uniqueLink,    
    brokenLink,    
    totalLink      
}