class TestString {

  const info = ({name, age}) => {
    let result = `Hello ${name}, you are ${age} years old.`;
    console.log(result);
  }

  const tmp = (addrs) => {
    return (
      `<table>${addrs.map((addr) => `
        <tr><td>${addr.first}</td></tr>
        <tr><td>${addr.last}</td></tr>
        `).join('')}
      </table>`
    );
  }

  const compile(template) {
    const evalExpr = /<%=(.+?)%>/g;
    const expr = /<%([\s\S]+?)%>/g;
    template = template.replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`').replace(expr, '`); \n $1 \n  echo(`');
    let script = `
    (function parse(data) {
      let output = '';
      function echo(html) {
        output += html;
      }
      ${ template }
      return output;
    })`;
    return script;
  }

  const interer(tem) {
    for (let str of tem) {
      console.log(str);
    }
  }
}

export default TestString;