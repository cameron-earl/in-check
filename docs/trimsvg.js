const fs = require('fs');

let basePath = './public/images/icons';

function trimsvgs() {
  fs.readdir(basePath, (err, iconfiles) => {
    console.log(iconfiles)
    for (let file of iconfiles) {
      fs.readFile(basePath + '/' + file, 'utf8', (err, data) => {
        let el = e(data);
        console.log(el);
      });
    }
  });
}

trimsvgs();

function e(e) {
  let t = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
  t.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + e + "</svg>";
  for (let n = document.createDocumentFragment();t.firstChild.firstChild;) n.appendChild(t.firstChild.firstChild);
  return n;
}
