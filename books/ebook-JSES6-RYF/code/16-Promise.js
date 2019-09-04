const promise = new Promise(function(resolve, reject) {
  if (success) {
    resolve(result);
  } else {
    reject(error);
  }
});

promise.then(function(value) {
  console.log(value);
}, fucntion() {
  console.log(error);
});

function timeout(ms) {
  let promise = new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
  return promise;
}
timeout(500).then((result) => {
  console.log(result);
}, (error) => {
  console.log(error);
});

function loadImageAsync(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    image.onload = function() {
      resolve(image);
    };
    image.onerror = function() {
      reject(new Error(url));
    };
    image.src = url;
  })
}

const getJSON = function(url) {
  const promise = new Promise((resolve, reject) => {
    const handler = function() {
      if (this.readtState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  });
  return promise;
};

getJSON('/posts.json').then((json) => {
  console.log(json);
}, (error) => {
  console.log(error);
});


// genarator and promise 
function getFoo() {
  return new Promise((resolve, reject) => {
    resolve('foo');
  });
}

const g = function* {
  try {
    const foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run(generator) {
  const it = genarator();
  function go(result) {
    if (result.done) {
      return result.value;
    }
    return result.value.then((value) => {
      return go(it.next(value));
    }, (error) => {
      return go(it.throw(error));
    });
  }
  go(it.next());
}

run(g);