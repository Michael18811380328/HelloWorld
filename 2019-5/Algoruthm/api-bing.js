class Bing {

  // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
  // 注意： filter() 不会对空数组进行检测。注意： filter() 不会改变原始数组。
  deleteOddNumber(source) {
    return source.filter((x) => {
      return x % 2 !== 0;
    });
  }

  // delete space or undefined in an array
  // arr = ['A', '', 'B', null, undefined, 'C', ' '];
  deleteSpace(array) {
    return array.filter((x) => {
      return x && x.trim();
    })
  }

  // delete repeat item 
  // arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
  deleteRepeat (array) {
    return array.filter(function(element, index, arr) {
      return self.indexOf(element) === index;
    });
  }

  setTreeData (source) {
    let cloneData = JSON.parse(JSON.stringify(source));// 对源数据深度克隆
    return cloneData.filter((father) => {// 循环所有项，并添加children属性
      let branchArr = cloneData.filter((child) => {
        father.id == child.parentId
      });   // 返回每一项的子级数组
      branchArr.length > 0 ? father.children = branchArr : '';
      //给父级添加一个children属性，并赋值
      return father.parentId == 0;
      //返回第一层
    });
  }

  // 调用时，字段名以字符串的形式传参，如treeData(source, 'id', 'parentId', 'children')
  treeData (source, id, parentId, children) {
    let cloneData = JSON.parse(JSON.stringify(source))
    return cloneData.filter(father=>{
      let branchArr = cloneData.filter(child => father[id] == child[parentId]);
      branchArr.length > 0 ? father[children] = branchArr : ''
      return father[parentId] == 0;
      // 如果第一层不是parentId=0，请自行修改
    });
  }

}

export Bing