const db = require('./db');

db.sync()
.then(()=>{
    console.log("\r\n Data base init done");process.exit(0);
})
.catch((e) => { 
    console.log(`failed:${e}`); process.exit(0); 
});

module.exports = db