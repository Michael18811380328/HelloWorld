import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import typeOf from 'type-of'
import { Node, Value } from 'slate'
import { Record } from 'immutable'

const String = new Record({
  object: 'string',
  text: '',
})

// serialize 串行化；序列化（slate对象=>html）
// deserialize 反序列化（html => slate 对象）

/**
 * A rule to (de)serialize text nodes. This is automatically added to the HTML
 * serializer so that users don't have to worry about text-level serialization.
 */
 // 文本节点的序列化和反序列化，自动增加到html转化过程中；用户不需要担心文本节点的转化

const TEXT_RULE = {
  deserialize(el) {
    // br 标签，转化为text对象，内容是/n
    if (el.tagName && el.tagName.toLowerCase() === 'br') {
      return {
        object: 'text',
        leaves: [
          {
            object: 'leaf',
            text: '\n',
          },
        ],
      }
    }

    if (el.nodeName == '#text') {
      // html注释部分不转化
      if (el.nodeValue && el.nodeValue.match(/<!--.*?-->/)) {
        return
      }
      // 文本节点转化成为text对象
      return {
        object: 'text',
        leaves: [
          {
            object: 'leaf',
            text: el.nodeValue,
          },
        ],
      }
    }
  },

  serialize(obj, children) {
    if (obj.object === 'string') {
      // 使用换行分隔符将children分开成为数组，使用reduce方法（传入匿名箭头函数）
      // 匿名函数：初始值是array，当前项是text，数组的索引是i
      return children.split('\n').reduce((array, text, i) => {
        // 如果不是0项，每一项和下一项之间放一个br标签
        if (i != 0) {
          array.push(<br key={i} />)；
        }
        array.push(text)
        // 将所有数组中的元素叠加起来，使用br作为间隔，返回array。
        return array
      }, [])
    }
  },

}

/**
 * A default `parseHtml` function that returns the `<body>` using `DOMParser`.
 *
 * @param {String} html
 * @return {Object}
 */
 // 默认：使用DOMParser返回<body></body>标签——把html传入，转换成DOM对象，获取其中的body对象并返回。如果没有dom对象，直接创建一个dom对象返回。

function defaultParseHtml(html) {
  if (typeof DOMParser === 'undefined') {
    throw new Error(
      'The native `DOMParser` global which the `Html` serializer uses by default is not present in this environment. You must supply the `options.parseHtml` function instead.'
    )
  }

  const parsed = new DOMParser().parseFromString(html, 'text/html')
  const { body } = parsed
  // COMPAT: in IE 11 body is null if html is an empty string
  return body || window.document.createElement('body')
}

// HTML序列化
/**
 * HTML serializer.
 */

class Html {
  /**
   * Create a new serializer with `rules`.
   *
   * @param {Object} options
   *   @property {Array} rules
   *   @property {String|Object|Block} defaultBlock
   *   @property {Function} parseHtml
   */

  constructor(options = {}) {
    let {
      defaultBlock = 'paragraph',
      parseHtml = defaultParseHtml,
      rules = [],
    } = options

    defaultBlock = Node.createProperties(defaultBlock)

    this.rules = [...rules, TEXT_RULE]
    this.defaultBlock = defaultBlock
    this.parseHtml = parseHtml
  }

  // Html对象默认的block是段落，使用默认的规则（text节点直接转换）



// html => slate Obj
/*******************************************************************************/
  /**
   * Deserialize pasted HTML.
   *
   * @param {String} html
   * @param {Object} options
   *   @property {Boolean} toRaw
   * @return {Value}
   */

  deserialize = (html, options = {}) => {
    const { toJSON = false } = options
    const { defaultBlock, parseHtml } = this
    const fragment = parseHtml(html)
    const children = Array.from(fragment.childNodes)
    let nodes = this.deserializeElements(children)

    // COMPAT: ensure that all top-level inline nodes are wrapped into a block.
    // 确保所有顶级的inline节点都会被包裹成一个block节点。

    nodes = nodes.reduce((memo, node, i, original) => {
      if (node.object == 'block') {
        memo.push(node)
        return memo
      }

      if (i > 0 && original[i - 1].object != 'block') {
        const block = memo[memo.length - 1]
        block.nodes.push(node)
        return memo
      }

      const block = {
        object: 'block',
        data: {},
        ...defaultBlock,
        nodes: [node],
      }

      memo.push(block)
      return memo
    }, [])

    // TODO: pretty sure this is no longer needed.
    if (nodes.length == 0) {
      nodes = [
        {
          object: 'block',
          data: {},
          ...defaultBlock,
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  object: 'leaf',
                  text: '',
                  marks: [],
                },
              ],
            },
          ],
        },
      ]
    }

    const json = {
      object: 'value',
      document: {
        object: 'document',
        data: {},
        nodes,
      },
    }

    const ret = toJSON ? json : Value.fromJSON(json)
    return ret
  }

  /**
   * Deserialize an array of DOM elements.
   *
   * @param {Array} elements
   * @return {Array}
   */

  // 元素集合节点
  deserializeElements = (elements = []) => {
    let nodes = []

    elements.filter(this.cruftNewline).forEach(element => {
      const node = this.deserializeElement(element)

      switch (typeOf(node)) {
        case 'array':
          nodes = nodes.concat(node)
          break
        case 'object':
          nodes.push(node)
          break
      }
    })

    return nodes
  }

  /**
   * Deserialize a DOM element.
   *
   * @param {Object} element
   * @return {Any}
   */
  // 元素节点
  deserializeElement = element => {
    let node

    if (!element.tagName) {
      element.tagName = ''
    }

    const next = elements => {
      if (Object.prototype.toString.call(elements) == '[object NodeList]') {
        elements = Array.from(elements)
      }

      switch (typeOf(elements)) {
        case 'array':
          return this.deserializeElements(elements)
        case 'object':
          return this.deserializeElement(elements)
        case 'null':
        case 'undefined':
          return
        default:
          throw new Error(
            `The \`next\` argument was called with invalid children: "${elements}".`
          )
      }
    }

    for (const rule of this.rules) {
      if (!rule.deserialize) continue
      const ret = rule.deserialize(element, next)
      const type = typeOf(ret)

      if (
        type != 'array' &&
        type != 'object' &&
        type != 'null' &&
        type != 'undefined'
      ) {
        throw new Error(
          `A rule returned an invalid deserialized representation: "${node}".`
        )
      }

      if (ret === undefined) {
        continue
      } else if (ret === null) {
        return null
      } else if (ret.object == 'mark') {
        node = this.deserializeMark(ret)
      } else {
        node = ret
      }

      break
    }

    return node || next(element.childNodes)
  }

  /**
   * Deserialize a `mark` object.
   * @param {Object} mark
   * @return {Array}
   */

  // Mark节点
  deserializeMark = mark => {
    const { type, data } = mark

    const applyMark = node => {
      if (node.object == 'mark') {
        return this.deserializeMark(node)
      } else if (node.object == 'text') {
        node.leaves = node.leaves.map(leaf => {
          leaf.marks = leaf.marks || []
          leaf.marks.push({ type, data })
          return leaf
        })
      } else if (node.nodes) {
        node.nodes = node.nodes.map(applyMark)
      }

      return node
    }

    return mark.nodes.reduce((nodes, node) => {
      const ret = applyMark(node)
      if (Array.isArray(ret)) return nodes.concat(ret)
      nodes.push(ret)
      return nodes
    }, [])
  }


/***********************************************************************/

  /**
   * Serialize a `value` object into an HTML string.
   * 序列化：将slate对象转化为html
   */

  serialize = (value, options = {}) => {
    const { document } = value
    const elements = document.nodes.map(this.serializeNode).filter(el => el);
    // 获取document内部的节点，并用serializeNode处理后返回结果，返回值用el过滤？
    if (options.render === false) {
      return elements
    }
    // 如果传入参数不渲染，直接返回
    const html = renderToStaticMarkup(<body>{elements}</body>);
    const inner = html.slice(6, -7)
    return inner
    /// 否则，使用renderToStaticMarkup进行处理后，截取字符串6——末端7的字符串，最后返回。
  }

  /**
   * Serialize a `node`.序列化节点
   */

  serializeNode = node => {
    if (node.object === 'text') {
      const leaves = node.getLeaves()
      // 如果是文本节点，节点自带getLeaves方法，获取叶节点对象，把每个对象用serializeLeaf处理。
      return leaves.map(this.serializeLeaf)
    }

    const children = node.nodes.map(this.serializeNode)

    // 把每一个节点分别使用本函数进行处理（递归）

    for (const rule of this.rules) {
      if (!rule.serialize) continue
      const ret = rule.serialize(node, children)
      if (ret === null) return
      if (ret) return addKey(ret)
    }

    throw new Error(`No serializer defined for node of type "${node.type}".`)
  }

  /**
   * Serialize a `leaf`. 序列化叶节点（slate--html）
   *
   * @param {Leaf} leaf
   * @return {String}
   */

  serializeLeaf = leaf => {
    const string = new String({ text: leaf.text })
    const text = this.serializeString(string)

    return leaf.marks.reduce((children, mark) => {
      for (const rule of this.rules) {
        if (!rule.serialize) continue
        const ret = rule.serialize(mark, children)
        if (ret === null) return
        if (ret) return addKey(ret)
      }

      throw new Error(`No serializer defined for mark of type "${mark.type}".`)
    }, text)
  }

  /**
   * Serialize a `string`.
   *
   * @param {String} string
   * @return {String}
   */

  serializeString = string => {
    for (const rule of this.rules) {
      if (!rule.serialize) continue
      const ret = rule.serialize(string, string.text)
      if (ret) return ret
    }
  }

  /**
   * Filter out cruft newline nodes inserted by the DOM parser.
   *
   * @param {Object} element
   * @return {Boolean}
   */

  cruftNewline = element => {
    return !(element.nodeName === '#text' && element.nodeValue == '\n')

  }
 * @param {Element} element
 * @return {Element}
 */

let key = 0

function addKey(element) {
  return React.cloneElement(element, { key: key++ })
}

/**
 * Export.
 *
 * @type {Html}
 */

export default Html
