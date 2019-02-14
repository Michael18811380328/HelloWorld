postComment(repoID, filePath, comment, detail) {
  const path = encodeURIComponent(filePath);
  // 需要加入 url 中的参数都需要 encode 处理（用户输入的参数或者文件路径）
  const url = this.server + '/api2/repos/' + repoID + '/file/comments/?p=' + path;
  let form = new FormData();
  form.append("comment", comment);
  if (detail) {
    // detail 参数可选
    form.append("detail", detail);
  }
  return this._sendPostRequest(url, form);
}

getCommentsNumber(repoID, path) {
  const p = encodeURIComponent(path);
  const url = this.server + '/api2/repos/' + repoID + '/file/comments/counts/?p=' + p;
  return this.req.get(url);
}

searchUsers(searchParam) {
  const url = this.server + '/api2/search-user/?q=' + encodeURIComponent(searchParam);
  return this.req.get(url);
}

listReviewers(reviewID) {
  const url = this.server + '/api/v2.1/review/' + reviewID + '/reviewer/';
  return this.req.get(url);
}

addReviewers(reviewID, reviewers) {
  const url = this.server + '/api/v2.1/review/' + reviewID + '/reviewer/';
  let form = new FormData();
  for(let i = 0 ; i < reviewers.length ; i ++) {
    form.append('reviewer', reviewers[i]);
  }
  return this._sendPostRequest(url, form);
}

getAuthorInfo = () => {
  seafileAPI.getAccountInfo().then((res) => {
    this.authorName = res.data.name;
    this.authorAvatar = res.data.avatar_url;
  });
}

listReviewers = () => {
  seafileAPI.listReviewers(reviewID).then((res) => {
    this.setState({
      reviewers: res.data.reviewers
    });
  });
}

componentWillMount() {
  this.getCommentsNumber();
  this.getAuthorInfo();
  this.listReviewers();
}