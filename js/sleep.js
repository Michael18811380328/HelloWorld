  // for loading page testing
  sleep = (numberMillis) => {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (this.state.loading == true) {
      now = new Date();
      if (now.getTime() > exitTime)
      return;
    }
  }