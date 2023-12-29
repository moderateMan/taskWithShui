const fs = require('fs');
const exec = require('child_process').exec

fs.cpSync("src/muiEazy", '../mui-eazy/src', { recursive: true });

exec('npm run build:debug', { cwd: '../mui-eazy' }, function (error, stdout, stderr) {
  if (error) {
    console.log(stderr)
    return
  }
  console.log(stdout)
});