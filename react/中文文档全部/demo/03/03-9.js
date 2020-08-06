// JSX 语法
// 如果有子节点，需要显示双标签；如果没有子节点，显示成一个自闭合标签即可
// 必须在 react 范围内
// 可以使用点语法引用一个React组件
import React from 'react';

const My = {
  DataPicker: function DataPicker(props) {
    return <div>{props.color}</div>;
  }
}

function Blue() {
  return <My.DataPicker color="blue" />
}

// 用户自定义的组件必须大写字母开头

// 运行的时候选择组件类型（不同环境下面渲染不同的子组件）
import React from 'react';
import { PhotoStory, VideoStory } from './story';

const com = {
  photo: PhotoStory,
  video: VideoStory,
};

function Story(props) {
  const SpecificStory = com[props.storyType];
  return <SpecificStory story={props.story} />;
}

// 属性展开
// 中间组件中，将不需要的属性用对象展开的形式传递,只解构需要的属性
const Button = props => {
  const { kind, ...other } = props;
  const className = kind === 'primary' ? 'btn' : 'bu';
  return <button className={className} {...other}/>; 
}

