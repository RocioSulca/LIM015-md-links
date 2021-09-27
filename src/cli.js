#!/usr/bin/env node

const { mdLinks } = require('./index.js');
const { uniqueLink, brokenLink, totalLink } = require('./ruta.js');
const { helpMsg, mdLiMsg, errMsg } = require('./msg.js');

const arg = process.argv[2];
console.log(mdLiMsg);
const [, , ...args] = process.argv;

if (args.length === 1) {
    mdLinks(arg, { validate: false }).then(resolve => {
        console.log(resolve);
    }).catch(reject => console.log(errMsg, reject));
}

if (args.length === 2) {
    if (args[1] === '--stats') {
        mdLinks(arg, { validate: true }).then((resolve) => console.log(totalLink(resolve) + uniqueLink(resolve)))
            .catch((err) => console.log(errMsg, err));
    };
    if (args[1] === '--validate') {
        mdLinks(arg, { validate: true }).then(resolve => {
                    console.log(resolve);
                }).catch(reject => console.log(errMsg, reject));
    };
    if(args[1] === '--help') {
        console.log(helpMsg);
    };
};

if (args.length === 3) {
    if ((args[1] === '--stats' && args[2] === '--validate') || (args[1] === '--validate' && args[2] === '--stats')) {
        mdLinks(arg, { validate: true }).then((resolve) => console.log(totalLink(resolve) + uniqueLink(resolve) + brokenLink(resolve)))
            .catch((err) => console.log(errMsg, err));
    };
};
if (args[1] !== '--stats' && args[1] !== '--validate' && args[1] !== undefined && args[1] !== '--help' ) {
    console.log('No se encontró comando válido, pruebe con: --help');
};
