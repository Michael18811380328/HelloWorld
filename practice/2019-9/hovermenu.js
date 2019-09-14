import React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import styled from 'react-emotion';
import initialValue from './value.json'
import { Button, Icon, Menu } from '../components'


const StyledMenu = styled(Menu)
`
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
`;

class HoverMenu extends React.Component {

  renderMarkButton(type, icon) {
    const { value } = this.props;
    const isActive = value.activeMarks.some(mark => mark.type == type);
    return (
      <Button
        reversed
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
  }

  // renderMarkButton(type, icon) {
  //   const { value } = this.props;
  //   const isActive = value.activeMarks.some((mark) => {
  //     return mark.type == type;
  //   });
  //   return (
  //     <Button reversed active={isActive} onMouseDown={(e) => this.onClick(e, type)}>
  //   );
  // }

  onClickMark(event, type) {
    event.preventDefault();
    const { value, onChange } = this.props;
    const change = value.change().toggleMark(type);
    onChange(change);
  }

  // onClickMark(e, type) {
  //   e.preventDefault();
  //   const { value, onChange } = this.props;
  //   const change = value.change().toggleMark(type);
  //   onChange(change);
  // }

  render() {
    const { className, innerRef } = this.props;
    const root = window.document.getElementById('root');
    return ReactDOM.createPortal(
      <StyledMenu className={className} innerRef={innerRef}>
        {this.renderMarkButton('bold', 'format_bold')}
        {this.renderMarkButton('italic', 'format_italic')}
        {this.renderMarkButton('underlined', 'format_underlined')}
        {this.renderMarkButton('code', 'code')}
      </StyledMenu>,
    root);
  }
}


class HoveringMenu extends React.Component {

  state = {
    value: Value.fromJSON(initialValue),
  }

  renderMark = (props) => {
    const { children, mark, attributes } = props
    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
    }
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  componentDidMount = () => {
    this.updateMenu()
  }

  componentDidUpdate = () => {
    this.updateMenu()
  }

  updateMenu = () => {
    const menu = this.menu;
    if (!menu) return;

    const { value } = this.state;
    const { fragment, selection } = value;

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      menu.removeAttribute('style');
      return;
    }

    const native = window.getSelection();
    const range = native.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;
    menu.style.left = `${rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2}px`;
  }

  render() {
    return (
      <div>
        <HoverMenu
          innerRef={menu => (this.menu = menu)}
          value={this.state.value}
          onChange={this.onChange}
        />
        <Editor
          placeholder="Enter some text..."
          value={this.state.value}
          onChange={this.onChange}
          renderMark={this.renderMark}
        />
      </div>
    )
  }
}

export default HoveringMenu;