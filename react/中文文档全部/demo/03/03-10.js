// 性能优化
// 开发时使用开发版本，部署时使用生产版本（去掉很多警告）
// create react app
// npm run build

// webpack 打包压缩
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({
      /* options */
    })]
  },
};

// ShouldComponentUpdate
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) return true;
    if (this.state.count !== nextState.count) return true;
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}
      >
        {this.state.count}
      </button>
    );
  }
}

// 或者使用 React.PureComponent 处理state和props的更新

// 使用不可变数据 immmutable
onClick() {
  this.setState(state => ({
    words: state.words.concat(['test'])
  }));
}

function updateColorMap(colormap) {
  colormap.right = 'blue';
}

function updateColorMap(colomap) {
  return Object.assign({}, colormap, {right: 'blue'});
}
