async function main() {
  // return Promise.resolve(123)
  return new Promise((resolve, reject) => {
    resolve(123);
  });
}
// 1
const data = main();
data.then((res) => {console.log(res);});
// 2
async function main2() {
  const data = await main();
  console.log(data);
}

main2();
