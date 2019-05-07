class TreeNode {

  constructor({ path, object, isLoaded, isPreload, isExpanded, parentNode }) {
    // 构造器:传入类需要的内容，现在需要 path, object， parentNode
    this.path  = path || object.name,
    // 默认路径设置是类名，是相对于父组件的相对路径
    this.object = object;
    this.isLoaded = isLoaded || false;
    this.isPreload = isPreload || false;
    this.isExpanded = isExpanded || false;
    this.children = [];
    // 这里的子节点是空的
    this.parentNode = parentNode || null;
    // 这里的父节点是可以传入的
  }


  // 这个函数目前没用
  clone(parentNode) {
    // 其他属性直接复制
    let treeNode = new TreeNode({
      path: this.path,
      object: this.object.clone(),
      // and so on
    });
    // 子节点需要把每一个子节点遍历后深复制
    treeNode.children = this.children.map(child => {
      let newChild = child.clone(treeNode);
      return newChild;
    });
    // 返回新创建的节点
    return treeNode;
  }

  // 生成路径函数：传入父节点。如果父节点是根节点或者不是根节点，返回这个节点的路径
  generatePath(parentNode) {
    return parentNode.path === '/' ? parentNode.path + this.object.name : parentNode.path + '/' + this.object.name;
  }

  // 这个函数有用
  setParent(parentNode) {
    // 可以给一个树节点设置父亲节点
    this.path = this.generatePath(parentNode);
    this.parentNode = parentNode;
    // this.isLoaded = false;
  }

  // no
  hasChildren() {
    return this.children.length !== 0;
  }

  // add a single node useful
  addChild(node) {
    // 把当前节点设置为子节点的父亲
    node.setParent(this);
    let children = this.children;
    // 获取当前的子节点数组
    
    if (node.object.isDir()) {
      // 如果是一个目录,直接在儿子节点中增加一个节点
      this.children.unshift(node);
    } else {
      // 如果不是一个目录
      let index = -1;
      for (let i = 0; i < children.length; i ++) {
        if (!children[i].object.isDir()) {
          index = i;
          break;
          // 如果子节点中是文件夹，获取所在的索引（文件夹在前，文件在后）
        }
      }
      if (index === -1 ) {
        // -1 all the node object is dir, 直接在后面加入节点
        this.children.push(node);
      } else if (index === 0 ) {
        // 0 all the nodes is file
        this.children.unshift(node);
      } else {
        // nodes have dir and file, insert new node in the index place
        this.children.splice(index, 0, node);
      }
    }
  }

  // 增加整个节点数组，直接吧每一个子节点的父亲设置成当前节点，同时所有儿子设置（全选的功能）
  addChildren(nodeList) {
    nodeList.forEach((node) => {
      node.setPartent(this);
    });
    this.children = nodeList;
  }

  // 删除一个子节点（新建一个子节点，将当前删除的节点过滤掉）
  deleteChild(node) {
    let children = this.children.filter((item) => {
      return item !== node;
    });
    this.children = children;
  }

  rename(newName) {
    // rename fire or dir 
    // 如果展开子节点，那么子节点路径需要刷新一次
    // 这里不需要
  }

  updateChildrenPath(node) {
    // 遍历子节点并更新文件路径
  }

  updateObjectProperties(keys, newValues) {
    // 更新对象的属性，这里不需要
  }

  serializeToJson() {
    let children = [];
    if (this.children) {
      children = this.children.map((child) => {
        child.serializeToJson();
      });
    }
    const treeNode = {
      path: this.path
      // 
    };
    return treeNode;
  }

  deserializefromJson(json) {
    //
  }
}

export default TreeNode;
