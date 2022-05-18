// Requiring the module
const reader = require('xlsx');
const fs = require('fs');
  
// Reading our test file
const file = reader.readFile('./Class.xlsx')
  
let data = []
  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
      data.push(res)
   })
}
  
// // Printing data
// console.log(data)



// // create a JSON object


// convert JSON object to string
const rdata = JSON.stringify(data);

// write JSON string to a file
fs.writeFile('class.json', rdata, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});