// PropTypes 静态数据类型验证
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <div>{this.props.name}</div>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string,
};

export default Greeting;

// 下面是常用的类型
array
bool
func
number 
object 
string 
symbol 

node 
element 
elementType 
instanceof(Message)
oneOf(['News', 'Photos'])
oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.instancceOf(Message),
])

arrayOf(PropTypes.number)
objectPf(PropTypes.number)

PropTypes.shape({
  color: PropTypes.string,
  fontSize: PropTypes.number,
})

PropTypes.any.isRequired,

Greeting.defaultProps = {
  name: 'Stranger'
};
