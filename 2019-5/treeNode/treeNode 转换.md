转换前 Slate node 数据结构：不完整的树

~~~json
{
  object: "block",
  type: "unordered_list",
  data: {…},
  nodes: [
    {
      object: "block",
      type: "list_item",
      data: {…},
      nodes: [
        {
          object: "block",
          type: "paragraph",
          data: {…},
          nodes: [
            {
              object: "inline",
              type: "link",
              data: {href: "http://..."},
              nodes: [{object: "text",leaves: [{object: "leaf",text: "第一章"}]}]
            }
          ]
        }
      ]
    },
    {
      object: "block",
      type: "list_item",
      data: {…},
      nodes: [
        {
          object: "block",
          type: "paragraph",
          data: {…},
          nodes: [
            {
              object: "inline",
              type: "link",
              data: { href: "http://..." },
              nodes: [{object: "text",leaves: [{object: "leaf",text: "第二章"}]}]
            }
          ]
        },
        {
          object: "block",
          type: "unordered_list",
          data: {…},
          nodes: [
            {object: "block", type: "list_item", data: {…}, nodes: [...]},
            {object: "block", type: "list_item", data: {…}, nodes: [...]}
          ]
        }
      ]
    }
  ]
}
~~~



转换后 treeNode 数据结构：完整的树

~~~json
{
  href: "#",
  name: null,
  parentNode: null,
  children:	[
  	{
      children: [],
      href: "http://...",
      name: "第一章",
			parentNode: {...}
  	},
    {
      href: "http://...",
      name: "第二章",
  		parentNode: {...}
      children: [
        {
          children: [],
          href: "http:...",
          name: "第一节 审阅界面独立的URL.md",
          parentNode: {...}
				},
				{
          children: [],
          href: "http:...",
          name: "第二节 审阅界面独立的URL.md",
          parentNode: {...}
				}
			]
    }
  ]
}
~~~



转换分两种：

1. 节点没有下层列表：获取 paragraph 节点的 name href，作为树节点的属性
2. 节点有下层列表：获取 paragraph 节点的 name href，作为树节点的属性，把 unorder list 作为当前树节点的 children 属性。

~~~js
transSlateToTree = (slateNodes, treeRoot) => {
  let treeNodes = slateNodes.map((slateNode) => {
    // item1 has children(unordered list)
    if (slateNode.nodes.length === 2 && slateNode.nodes[1].type === 'unordered_list') {
      // slateNode.nodes[0] is paragraph, create TreeNode, then set name and href
      let treeNode = new TreeNode({ name: name, href: href });
      // slateNode.nodes[1] is unordered-list, set it as TreeNode's children 
      treeNode = this.transSlateToTree(slateNode.nodes[1].nodes, treeNode);
      return treeNode;
    } else {
      // item2 doesn't have children list
      return new TreeNode({ name: name, href: href });
    }
  });
  treeRoot.addChildren(treeNodes);
  return treeRoot;
}
~~~

