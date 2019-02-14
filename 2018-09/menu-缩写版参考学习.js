import { Editor } from 'slate-react'
import { Value } from 'slate'

import React from 'react'
import ReactDOM from 'react-dom'
import initialValue from './value.json'
import styled from 'react-emotion'
import { Button, Icon, Menu } from '../components'

// 在react中，虚拟DOM节省性能，所以避免在react中直接操作DOM节点。

// Virtual DOM is awesome. It allows us to express our application's viewas a function of its state. But existing solutions were way way too bloated, too slow, lacked features, had an API biased towards OOP and/or lacked features I needed.

// 虚拟DOM不会进行排版与重绘操作；虚拟DOM进行频繁修改，然后一次性比较并修改真实DOM中需要改的部分（注意！），最后并在真实DOM中进行排版与重绘，减少过多DOM节点排版与重绘损耗

// 真实DOM频繁排版与重绘的效率是相当低的

// 虚拟DOM有效降低大面积（真实DOM节点）的重绘与排版，因为最终与真实DOM比较差异，可以只渲染局部（同2）
// 总损耗 = 虚拟DOM增删改 + （与Diff算法效率有关）真实DOM差异增删改 + （较少的节点）排版与重绘

const StyledMenu = styled(Menu)`
  padding: 8px 7px 6px;
  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: #222;
  border-radius: 4px;
  transition: opacity 0.75s;
`
// 设置预设样式：使用top-left负无穷，比display：none更节省性能 opacity相对于display也节省性能

class HoverMenu extends React.Component {

  render() {
    const { className, innerRef } = this.props
    const root = window.document.getElementById('root')

    return ReactDOM.createPortal(
      <StyledMenu className={className} innerRef={innerRef}>
        {this.renderMarkButton('bold', 'format_bold')}
        {this.renderMarkButton('italic', 'format_italic')}
        {this.renderMarkButton('underlined', 'format_underlined')}
        {this.renderMarkButton('code', 'code')}
      </StyledMenu>,
      root
    )
  }
}
//

class HoveringMenu extends React.Component {

  state = {
    value: Value.fromJSON(initialValue),
  }
  componentDidMount = () => {
    this.updateMenu()
  }
  componentDidUpdate = () => {
    this.updateMenu()
  }

  updateMenu = () => {
    const menu = this.menu
    if (!menu) return

    const { value } = this.state
    const { fragment, selection } = value

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      menu.removeAttribute('style')
      return
    }

    const native = window.getSelection()
    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`
  }

  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    return (
      <div>
        <HoverMenu
          innerRef={menu => (this.menu = menu)}
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export default HoveringMenu