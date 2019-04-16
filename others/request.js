let http = require('http');

http.createServer(async (req, res) => {
    try {
        console.log("================= headers ==================");
        console.dir(req.headers);
        console.log("^==========================================^");
        let body = '';
        req.setEncoding('utf8');
        for await (const chunk of req) {
            body += chunk;
        }
        console.log("================= body =====================");
        console.log(body);
        console.log("^==========================================^");
      res.write(body);
      res.end();
    } catch (e){
      res.statusCode = 500;
      res.end();
    }
  }).listen(1337);

//   let mode_server_creatusers = {
//     host    :   "localhost",
//     port    :   1337,
//     method  :   "POST",
//     path    :   "/",
//     headers : {
//         "Content-Type" : "application/json",
//         Authorization : "ModeCloud v1.cGt8MTA4OHxrMTUzNDk3NzIzODI2Mzc1OTgzNw==.1534977238.d8d9f1ddb9bd50accdb832539ecd1719a744d5cbdb1ce61978347358",
//     },
//     timeout :    10000
// };
// cli = http.request(mode_server_creatusers, async(chunck) =>{
//     try {
//         let body = '';
//         chunck.setEncoding('utf8');
//         for await (const data of chunck) {
//             body += data;
//             body += "999";
//         }
//         console.log(body)
//     } catch(e) {
//         console.log(e)
//     }
// });

// j = {
// 	"fdsa":"123"
// }
// cli.write(j.toString());
// cli.end();