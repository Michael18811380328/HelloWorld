// render() {
//   return(
//     <React.Fragment>
//       <ChildA/>
//       <Childb/>
//     </React.Fragment>
//   );
// }
// 实际上在table中使用较多（中间不能间隔其他标签）
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns/>
        </tr>
      </table>
    );
  }
}

class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td></td>
        <td></td>
        <td></td>
      </React.Fragment>
    );
  }
}

// 短语法
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td><td>Michael</td>
      </>
    );
  }
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => {
        <React.Fragment key={item.id}>
          <dt>{item.name}</dt>
          <dt>{item.age}</dt>
        </React.Fragment>
      })}
    </dl>
  );
}