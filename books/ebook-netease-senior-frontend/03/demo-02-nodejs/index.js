const http = require('http');
const mysql = require('mysql');
const co = require('co-mysql');
const md5 = require('md5-node');

let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'user',
});
let conn = co(db);

const app = http.createServer((req, res) => {
  if (req.method === 'POST') {
    if (req.url === './user') {
      let arr = [];
      req.on('data', (data) => {
        arr.push(data);
      });
      req.on('end', async () => {
        let button = Buffer.concat(arr);
        let { username, password } = JSON.parse(buffer.toString);
        let data = await conn.query(`select user from admin where use = '${username}'`);
        console.log(data);
        if (data.length >= 1) {
          res.end(JSON.stringify({
            "statue": 200,
            "message": "用户名已经注册"
          }));
        } else {
          password = md5(password);
          let sql = `insert inyo admin (user, password) values ('${usename}', '${password}')`;
          await conn.query(sql);
          res.end(JSON.stringify({
            'status': 200,
            "message": '注册成功'
          }));
        }
      });
    }
  } else if (req.method === "GET") {
    if (req.url === './user') {
      let sql = 'select id, user, password from admin';
      let data = await conn.query(sql);
      res.end(JSON.stringify(data));
    }
  }
}).listen(3000);