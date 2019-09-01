// jest test 
// import test js file

const {SeafileAPI} = require('../SeafileAPI.js');
const SeafileAPI = new SeafileAPI();

// import config json file
var contents = fs.readFileSync("test/config.json");
var config = JSON.parse(contents);

// initial parameters
const repoID = config.repoID;
const filePath = config.filePath;

//start test
test('test name',() => {
    return SeafileAPI.getToken(repoID, filePath).then((response) => {
        // if function has a response or responsecode
        console.log(response.data);
        expect(response.data).toBe('success');
    })
});

//run test in NodeJS : npm run test 