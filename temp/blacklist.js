// 监测一个字符串中含有黑名单的字符
// 并正则替换或者计数
function check(news, blacklist, strategy) {
  if (!news || !blacklist || !Array.isArray(blacklist)) return;
  strategy = strategy || '';
  blacklist = blacklist.map((item) => {
    return '(' + item + ')';
  }).join('|');
  let regex = new RegExp(blacklist, 'g');
  // stratery 是可选参数，对于正则处理的解决
  return news.replace(regex, strategy);
}

let str = '今天是个好天气，我们一起去秘密区域，进行秘密测试，访问机密文件等等';
let blacklist = ['秘密', '机密'];
let strategy = '***'; // 处理策略：敏感词汇*取代

check(str, blacklist, strategy);