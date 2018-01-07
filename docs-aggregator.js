#!/usr/bin/env node

const jsonFile = require('jsonfile');
const productFile = './products.json';
const shell = require('shelljs');
const path = require('path');
const replace = require('replace');
const fse = require('fs-extra');

jsonFile.readFile(productFile, function(err, obj) {
  const allProducts = obj.products;

  for (const key in allProducts) {
    // clean
    shell.exec('rm -rf ./repos/' + key);

  if (allProducts.hasOwnProperty(key)) {
      // clone repo
      const url = allProducts[key].url;
      const repoName = key;
      shell.exec('git clone ' + url + ' ./repos/' + repoName);
      const docsDestRoot = path.join('./content/docs');
      const versions = allProducts[repoName].versions;
      const versionsLen = versions.length;
      for (let j = 0; j < versionsLen; j++) {
        if (versions[j].hostDocs) {
          const branch = versions[j].branch;
          console.log('branch: ......', branch);
          shell.pushd(path.join('.', 'repos', repoName));
          shell.exec('git checkout ' + branch);
          shell.popd();

          const replaceWith = path.join('(/docs', branch);

          replace({
            regex: '(\\(/docs)',
            replacement: `${replaceWith}`,
            paths: [`./repos/${repoName}/docs/`],
            recursive: true,
            silent: true
          });

          replace({
            regex: '.md\\)',
            replacement: ')',
            paths: [`./repos/${repoName}/docs/`],
            recursive: true,
            silent: true
          });

          replace({
            regex: '/docs/images',
            replacement: `/products/${repoName}/${branch}/images`,
            paths: [`./repos/${repoName}/docs/`],
            recursive: true,
            silent: true
          });

          // copy docs into content/docs/<version>/
          const docsDestDir = path.join(docsDestRoot, branch);
          // delete the dir if exist
          fse.removeSync(docsDestDir);
          // create the dir
          fse.ensureDirSync(docsDestDir);
          try {
            fse.copySync(`./repos/${repoName}/docs/`, `./content/docs/${branch}/`);
            console.log('!!success!!');
          } catch (error) {
            console.log('=======error: ', error);
          }
          shell.pushd(path.join('.', 'repos', repoName));
          shell.exec('git checkout -- .');
          shell.popd();
        }
      }
      // clean
      shell.exec('rm -rf ./repos/' + key);
    }
  }
});
