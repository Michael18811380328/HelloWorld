class Store {

  constructor(eventBus) {
    this.value = null;
    this.operations = [];
    this.view_index = 0;
    this.currentTable = 0;
    this.isClientSide = true;
    this.eventBus = eventBus;
    this.redos = [];
    this.undos = [];
    this.pendingOperations = [];
    this.disconnectOperation = [];
    this.socketConnected = false;
    this.sendingOperation = null;
    this.isReconnect = false;
    if (!process.env || process.env.NODE_ENV !== 'test') {
      this.socketClient = new SocketClient(this);
    }
  }

  /**
   * deserialize data
   * @author Michael An
   * @DateTime 2019-09-30T17:34:35+0800
   * @param    {[type]}                 value [description]
   * @return   {[type]}                       [description]
   */
  deserializeDtable(value) {
    this.value = value;
    let tables = this.value.tables;
    tables.map((table) => {
        normalizeTable(table, this.value, tables);
    });
    return this.value;
  }

  /**
   * handle connect state for socket error or connect
   * @author Michael An
   * @DateTime 2019-09-30T17:34:53+0800
   * @param    {[type]}                 state [description]
   * @param    {[type]}                 msg   [description]
   * @return   {[type]}                       [description]
   */
  dispatchConnectState(state, msg) {
    if (state === 'connect') {
      this.socketConnected = true;
      if (this.isReconnect) {
        this.isReconnect = false;

        if (msg.state) {
          this.redos = [];
          this.undos = [];

          if (this.sendingOperation) {
            this.pendingOperations.unshift(this.sendingOperation);
          }
          this.disconnectOperation = this.pendingOperations.slice(0);
          debug('Reconnect');

          if (!this.value || msg.nextVersion > this.value['version']) {
            debug('Reload when reconnect');
            this.pendingOperations = [];
            let { dtableUuid } = window.dtable;

            dtableAPI.getTableData(dtableUuid).then(res => {
              let value = this.deserializeDtable(res.data);
              let view_index = this.view_index;
              let table_index = this.value.tables.findIndex((table) => {
                return table['_tid'] === this.currentTable['_tid'];
              });
              Views.selectView(value.tables, table_index, view_index);
              this.eventBus.dispatch('data-changed', value);
              for (let i = 0; i < this.disconnectOperation.length; i++) {
                this.applyLocalOperation(this.disconnectOperation[i]);
              }
            });
          } else {
            this.eventBus.dispatch('begin-saving');
            this.sendNextOperation();
          }
        } else {
          this.eventBus.dispatch('execute-error', msg.message);
        }

      }
    }
    if (state === 'reconnect') {
      this.isReconnect = true;
    }
    if (state === 'disconnect') {
      this.socketConnected = false;
    }
    this.eventBus.dispatch(state);
  }

  setCurrentTable(tableIndex) {
    this.currentTable = TableUtils.getTableByIndex(this.value.tables, tableIndex);
  }
}














