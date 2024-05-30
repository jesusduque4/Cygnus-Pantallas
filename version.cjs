const fs = require('fs');
const path = require('path');


const idVersion = process.argv[2];
console.log(`versión compilada: ${idVersion}`);  
if (!idVersion || idVersion === '$VERSION_ID') {
  console.error('Por favor proporciona un ID de versión válido.');
  process.exit(1);
}


const updateVersionInEnvironment = (filePath) => {
  let environmentContent = fs.readFileSync(filePath, 'utf8');

 
  if (environmentContent.includes('version:')) {
    environmentContent = environmentContent.replace(/version: '.*'/, `version: '${idVersion}'`);
  } else {
    environmentContent = environmentContent.replace(/(const environment = {)/, `$1\n  version: '${idVersion}',`);
  }
  fs.writeFileSync(filePath, environmentContent, 'utf8');
};


const environmentFiles = [
  path.join(__dirname, 'src/environments/environment.ts'),
  path.join(__dirname, 'src/environments/environment.prod.ts')
];


environmentFiles.forEach(updateVersionInEnvironment);
