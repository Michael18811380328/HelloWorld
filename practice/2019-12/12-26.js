// 第一步 ：根据班组去查询echarts数据
// 得到数据后把每一次请求得到的数据都存到一个对象中，并用班组进行命名
function rollEp() {
  return new Promise(async(resovle,reject) => {
    let index = 0;
    for (let i = 0; i < this.mySelect.length; i++) {
      const URL = `${myIP.$HOST_DPMS_SERVICE}/KPIhy/tendencyAssessScoreStatistics?Unit_Code=1001&StartTime=${this.time1[0]}
        &TeamGroup=${this.mySelect[i].Team_Group}&EndTime=${this.time1[1]}`;
      await this.$http.get(URL).then((res) => {
        let myTest = this.mySelect[i].Team_Group;
        Ex1[myTest] = res;
        index++;
      });
    }
    if (index === this.mySelect.length){
      //判断所有的异步操作都执行完成
      resovle('获取数据成功');
    }
  });
}

// 第二步，预处理变量
function myP1() {
  return new Promise((resolve, reject) => {
    this.getSelect().then((res) => {
      let myLegend1 = [];
      let myEdate = [];
      let myED = [];
      this.rollEp().then((res)=>{
        if (JSON.stringify(Ex1) == '{}'){
          reject(false);
        } else {
          resolve(true);
        }
      })
      console.log(Ex1);
    }).catch((res) => {
      console.log(res);
    });
  });
}

//第三步：生成echarts格式数据
function getEchart1() {
  this.myP1().then(() => {
    let myEchartPre = [];
    let scorePre = {};
    Object.keys(Ex1).forEach((key) => {
      myLegend1.push(key);
    });
    myEdate = this.getAll(this.time1[0].split(' ')[0].replace(/-/g,"/"), this.time1[1].split(' ')[0].replace(/-/g,"/"));
    Object.values(Ex1).forEach((key, i2, n2) => {
      if (i2 == 0) {
        myEchartPre.push(key);
      }
      let myTest4 = [];
      for(let i = 0; i < myEdate.length; i++){
        let newArr = n2[i2].filter((option) => { return option.et.split(' ')[0] == myEdate[i];});
        if (newArr.length) {
          myTest4.push(newArr[0].KPI_Assess_Score);
        } else{
          myTest4.push('');
        }
      }
      scorePre[i2] = myTest4;
      myED.push({
        name: n2[i2][0].Team_Group,
        connectNulls: true,
        type: 'line',
        data: scorePre[i2],
        smooth: true,
      });
    });
    // 启动echarts注入
    this.draw1();
  }).catch(()=>{
    console.log('获取失败');
  });
}