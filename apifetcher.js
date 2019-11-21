// //const axios = require("axios");
// //const URL = "http://192.168.1.157:88/";
// const URL = "https://app.fahasa.com:88/";

// function ApiGet(_url,data, outURL) {
//   var url;
//   if (!outURL){
//     url = URL+generateURLGet(_url,data);
//   }
//   else {  
//     url = _url;
//   }
//   return new Promise((resolve, reject) => {
//     axios.get(url)
//     .then(res=>{
//       resolve(res.data)})
//     .catch(e => {
//       console.log(e)
//       reject(e)
//     });
//   });
// }

// function generateURLGet(url,data){
//   let text = url + "?";
//   let keys = Object.keys(data);
//   keys.forEach((item,idx)=>{
//     text+= "&"+ item  + "=" + data[item] 
//   })
//   return text
// }

// module.exports = { ApiGet };
