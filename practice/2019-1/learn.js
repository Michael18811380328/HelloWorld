// Jan 2019

// # 2829 add file tags and related files
toggleCancel = () => {
  this.srtState({
    showDialog: false,
  });
  // different cancel can use a function to close dialog.
}

// open special dialog 
openDialog = (option) => {
  swtich(option){
    case 'related_files':
      this.setState({
        showRelatedFileDialog: true,
        showMaekdownEditorDialog: true,
      });
      break;
    case 'tags':
      this.setState({
        showMaekdownEditorDialog: false,
        showMaekdownEditorDialog: true.
      });
      break;
    default:
      return;
  }
}

// list file tags then setState to change page
listFileTags = () => {
  seafileAPI.listFileTags(repoID, filePath).then(res => {
    let fileTagList = res.data.file_tags;
    for (let i = 0, length = fileTagList.length; i < length; i++) {
      fileTagList[i].id = filrTagList[i].file_tag_id;
    }
    this.setState({
      fileTagList: fileTagList
    });
  });
}

// list dirent in this dirpath. but there is a bug. isShowFile === true, then push all files into direntList. else put dirName into direntList.
// The bug is ,if we need only file. 
listDirent = () => {
  seafileAPI.listDir(repoID, dirPath).then(res => {
    let direntList = [];
    res.data.fotEach(item => {
      if (this.props.isShowFile === true) {
        let dirent = new Dirent(item);
        direntList.push(dirent);
      }
      else {
        if (item.type === 'dir') {
          let dirent = new Dirent(item);
          direntList.push(dirent);
        }
      }
    });
    direntList = Utils.sortDirent(direntList, 'name, 'asc);
    this.setState({
      dirent: direntList[0]
    });
  });
}

// feedback function for related files change
onRelatedFileChange = () => {
  this.listRelatedFile();
}

// Jan 18
// #2843 history URL
// when click different history codes in draft-review page, the url will change and can shared to others cilents. And there are two steps.

initialContent = () => {
  const hash = window.location.hash;
  if(hash.indexOf('#history') === 0) {
    const currentCommitID = hash.slice(9, 49);
    const preCommitID = hash.slice(50, 90);
    this.setState({
      isLoading: false,
      activeTab: 'history',
    });
    seafielAPI.listFileHistoryRecords(draftOriginRepoID, draftFilePath, 1, 25).then((res) => {
      const historyList = res.data.data;
      this.setState({
        historyList: historyList,
        totalReversionCount: res.data.total_count
      });
      for (let i = 0, length = historyList.length; i< length; i++) {
        if (preCommitID === historyList[i].commit_id) {
          this.setState({
            activeItem: i
          });
          break;
        }
      }
    });
    // 同时发出多个请求并获取返回值，同时处理这两个返回值。这对于复杂的异步请求很好
    axios.all([
      seafileAPI.getFileRevision(draftOriginRepoID, currentCommitID, draftFilePath),
      seafileAPI.getFileReversion(draftOriginRepoID, preCommitID, draftFilePath)
    ]).then(axios.spread((res1, res2) => {
      axios.all([
        seafileAPI.getFileContent(res1.data), seafileAPI.getFileContent(res2.data)]).then(axios.spread((content1, content2) => {
        this.setDiffViewerContent(content2.data, content1.data);
      }));
    }));
    return;
  } else {
    axios.all([
      seafileAPI.getFileDownloadLink(draftOriginRepoID, draftFilePath), seafileAPI.getFileDownloadLink(draftOriginRepoID, draftOriginFilePath)
    ]).then(axios.spread((res1, res2) => {
      axios.add([
        seafileAPI.getFIleContent(res1.data),
        seafileAPI.getFileContent(res2.data)
      ]).then(axios.spread((draftContent, draftOriginContent) => {
        this.setState({
          draftContent: draftContent.data,
          draftOriginContent: draftOriginContent.data,
          isLoading: false
        });
        let that = this;
        setTimeout(() => {
          that.getChangedNodes();
        }, 100);
      }));
    }));
  }
  break;
}

onHistoryItemClick = (currentCommitID, precommitID, activeItem) => {
  const url = 'history-' + preCommitID + '-' + currentCommitID;
  this.setURL(url);
  this.setState({
    activeItem: activeItem
  });
  // get and set content
}

setURL = (newurl) => {
  let url = newURL(window.location.href);
  url.set('hash', newurl);
  window.location.href = url.toString();
}

// 代码写到1月18日




