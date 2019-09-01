// 这是学习文件，正常文件还在原处
// 引入测试文件
const { SeafileAPI } = require('../src/seafile-api')

// load config from config.json
var fs = require("fs");
var contents = fs.readFileSync("test/config.json");

/*加载配置信息：json文件内容
{
  "server": "https://download.seafile.top",
  "username": "xxxx",
  "password": "xxxx"
}
*/ 
var config = JSON.parse(contents);
const repoID = "8342175d-cb2c-457c-adde-66c632c6adc8";

const filePath = "/test.md"
const dirPath = "/"

const seafileAPI = new SeafileAPI();

seafileAPI.init({ 
  server: config.server, 
  username: config.username, 
  password: config.password 
});

beforeAll(() => {
  return seafileAPI.login();
});

test("authPing", () => {
  return seafileAPI.authPing().then((response) => {
    console.log(response.data);
    expect(response.data).toBe('pong');
    // 为什么结果是pong？？？
  });
});

/*
seafileAPI.login().then((response) => {

  seafileAPI.listRepos().then((response) => {
    //console.log(response.data);
  });


  seafileAPI.getFileInfo(repoID, filePath).then((response) => {
    console.log(response.data);
  });


  seafileAPI.getFileDownloadLink(repoID, filePath).then((response) => {
    var downloadLink = response.data;
    seafileAPI.getFileContent(downloadLink);
  });


  seafileAPI.listDir(repoID, dirPath).then((response) => {
    //console.log(response.data);
  });


  seafileAPI.listDir(repoID, dirPath, {recursive:true}).then((response) => {
    //console.log(response.data);
  });


  seafileAPI.getUpdateLink(repoID, dirPath).then((response) => {
    //console.log(response.data);
  });


  seafileAPI.getUploadLink(repoID, dirPath).then((response) => {
    //console.log(response.data);
  });

})
*/
