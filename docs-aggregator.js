const jsonFile = require('jsonfile'); const productFile = './products.json'; const shell = require('shelljs'); const path = require('path'); jsonFile.readFile(productFile, 
function(err, obj) {
  const allProducts = obj.products;
  // clean repos/
  shell.exec('rm -rf ./repos/');
  for (const key in allProducts) {
    if (allProducts.hasOwnProperty(key)) {
      // clone repo
      const url = allProducts[key].url;
      const repoName = key;
      shell.exec('git clone ' + url + ' ./repos/' + repoName);
      const docsDestRoot = path.join('../../content/docs');
      const versions = allProducts[repoName].versions;
      const versionsLen = versions.length;
      for (let j = 0; j < versionsLen; j++) {
        if (versions[j].isDocsAvailable) {
          const branch = versions[j].branch;
          console.log('branch: ......', branch);
          shell.exec('pwd');
          shell.pushd(path.join('.', 'repos', repoName));
          shell.exec('git checkout ' + branch);

          // install 'replace' globally ($ npm i -g replace)
          const replaceWith = path.join('(/docs', branch);
          console.log('>>>>>replaceWith: ', replaceWith);
          shell.exec("replace '(\\(/docs)' '" + replaceWith + "' docs -r");
          shell.exec("replace '.md\\)' ')' docs -r");
          // shell.exec('git log -2');
          // copy docs into content/docs/<version>/
          const docsDestDir = path.join(docsDestRoot, branch);
          // delete the dir if exist
          shell.exec('rm -rf ' + docsDestDir);
          shell.exec('mkdir -p ' + docsDestDir);
          shell.exec('cp -rf docs/ ' + docsDestDir);
          shell.exec('git checkout -- .');
          shell.popd();
        }
      }
      // clean
      // shell.exec('rm -rf ./repos/' + key);
    }
  }
});
