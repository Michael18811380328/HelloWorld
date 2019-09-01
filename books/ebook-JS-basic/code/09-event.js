// eg1: progress event 进度事件
let event = new ProgressEvent('load', {
  lengthComputable: true,
  loaded: 10,
  total: 100
});

document.body.addEventListener('load', (e) => {
  console.log('' + (e.loaded / e.total) * 100 + '%'); // 10/100 = 10%
});

document.body.dispatch(event);


// eg2 ajax progress event

var xhr = new XMLHttpRequest();

xhr.addEventListener('progress', updateProgress, false);
xhr.addEventListener('load', transferComplete, false);
xhr.addEventListener('error', transferFailed, false);
xhr.addEventListener('abort', transferCanceled, false);

xhr.open();

function updateProgress(e) {
  if (e.lengthComputable) {
    var percentComplete = e.loaded / e.total;
  } else {
    console.log('We can\'t calculate XHR progress rate.');
  }
}

function transferComplete(e) {
  console.log('Load end');
}

function transferFailed(evt) {
  console.log('error during loading');
}

function transferCanceled(evt) {
  console.log('load cancel');
}