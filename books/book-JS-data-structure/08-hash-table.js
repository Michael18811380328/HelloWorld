// 哈希表-散列表
// 散列算法: 散列函数可以获取一个内存地址，从而进行快速检索。简单的哈希函数就是把ASCII码相加
function HashTable() {
  let table = [];

  loseHashCode = (key) => {
    let hash = '';
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  }

  this.put = (key, value) => {
    let position = loseHashCode(key);
    table[position] = value;
  }

  this.get = (key) => {
    return table[loseHashCode(key)];
  }

  this.remove = (key) => {
    table[loseHashCode(key)] = undefined;
  }

  this.print = () => {
    for (let i = 0; i < table.length; i++) {
      if (table[i] !== undefined) {
        console.log(i + ' ' + table[i]);
      }
    }
  }

  // 解决哈希冲突：分离链接，线性探查，双散列法
  class ValuePair(key, value) {
    this.key = key;
    this.value = value;
  }

  this.put = (key, value) => {
    
  }
}



























