const fs = require("fs");
const path = require("path");

// Create and write to file

fs.writeFile(path.join(__dirname, "testo.txt"), "Ho scritto un todo  ", err => {
  if (err) throw err;
  console.log("File written to..");

  // File append (è dentro la callback di write)
  fs.appendFile(path.join(__dirname, "testo.txt"), "I Love node.js", err => {
    if (err) throw err;
    console.log("File written to..");
  });
});

fs.readFile(path.join(__dirname, "testo.txt"), "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
