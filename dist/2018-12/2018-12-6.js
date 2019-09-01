getTitlesInfo = () => {
  let titlesInfo = [];
  let headingList = document.querySelectorAll('h2[id^="user-content"], h3[id^="user-content"]');

  for (let i = 0; i < headingList.length; i++) {
    titlesInfo.push(headingList[i].offsetTop);
  }

  this.titlesInfo = titlesInfo;
};

function test() {
  if (this.props.hash) {
    let hash = this.props.hash;
    setTimeout(function () {
      window.location.hash = hash;
    }, 500);
  }

  setTimeout(function () {
    that.getTitlesInfo();
  }, 500);
}

class Test {
  componentDidMount() {
    this.getTitlesInfo();
    this.props.onContentRendered(this);
  }

  componentWillMount() {
    const hash = window.location.hash;

    if (hash.slice(0, 1) === '#') {
      this.hash = hash;
    }
  }

}