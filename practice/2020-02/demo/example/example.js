import Debug from 'debug';
import DTable from 'dtable-sdk';
import logger from './logger';

const debug = Debug('dtable:example');
const dtableConfig = {
  server: "http://127.0.0.1:8001",
  APIToken: "a210adc7d9c295e8596c5a15c2779aaa120c9cb6",
  workspaceID: "3",
  dtableName: "test2",
};

class Test {
  constructor(dtable) {
    this.dtable = dtable;
  }

  getInfo() {
    let { dtable } = this;
    const tables = dtable.dtableStore.value.tables;
    const tableLength = tables.length
    logger.info("Tables number is " + tableLength);
    let recordNumber = 0;
    for (let i = 0; i < tableLength; i++) {
      const rows = tables[i].rows;
      recordNumber += rows.length;
    }
    logger.info("Records number is " + recordNumber);
  }
}

let dtable = new DTable();
let test = new Test(dtable);

async function init() {
  await dtable.init(dtableConfig);
  dtable.subscribe('dtable-connect', () => {test.getInfo();});
  await dtable.syncWithServer();
}

init();