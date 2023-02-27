
const express = require("express");
const app = express();

const PORT = 4000;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

// fs.readFile('./cool.txt','utf-8',(err,data) =>{
//     if(err){
//         console.log(err,"logging")
//     }
//     else{
    
//         console.log(data);
//     }
    
//     } )
    

const fs = require("fs");
const path = require("path");

app.post("/create-file", function (request,response) {

const folderpath = './text-files';
const date = new Date();
const fileName =`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.txt`;
const filepath = path.join(folderpath,fileName);
const fileContent = `Current Timestamp : ${Date.now()}`




fs.writeFile(filepath,fileContent,(err) =>{

if(err){

console.log(err);
response.status(500).send("Error creating file");
}
else{
console.log(`file ${fileName} created successfully`);
response.status(200).send(`file created successfully`)

}


} )

} )


app.get('/text-files', (req, res) => {
  const folderPath = './text-files';

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading directory');
    } else {
      const textFiles = files.filter(file => path.extname(file) === '.txt');
      console.log(`Found ${textFiles.length} text files`);

      const textFileContents = [];

      textFiles.forEach((file) => {
        const filePath = path.join(folderPath, file);
        const readStream = fs.createReadStream(filePath);
        let contents = '';

        readStream.on('data', (chunk) => {
          contents += chunk;
          console.log(contents,  "form first chunk");
        });

        readStream.on('end', () => {
          textFileContents.push({ fileName: file, contents: contents });
          if (textFileContents.length === textFiles.length) {
            res.status(200).send(textFileContents);
          }
        });

        readStream.on('error', (err) => {
          console.error(err);
          res.status(500).send(`Error reading file ${file}`);
        });


      });
    }
  });
});









