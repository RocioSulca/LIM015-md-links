const methods = require('./ruta.js');

const mdLinks = (path, options) =>
    new Promise((resolve, reject) => {
        const absolute = methods.isAbsolute(path);
        const existPath = methods.pathExist(absolute);
        if (existPath) {
            const searchMdFile = methods.searchFileMd(absolute);    
            searchMdFile.map((elem) => {
                return methods.readLinksMd(elem);
            });
            const readMdLinks = methods.readLinksMd(path);
            if (options.validate === true) {
                const validacionLinks = readMdLinks.map((links) => {
                    const validacion = methods.validateLink(links);
                    return validacion;
                });
                resolve(Promise.all(validacionLinks));
            } else {
                resolve(readMdLinks);
            }
        } else {
            reject('La ruta no es valida');
        }
    });

module.exports = {
    mdLinks
}
