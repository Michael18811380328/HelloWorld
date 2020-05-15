const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator');
const ejs = require('ejs');
const config = require('../wypack.json');
const entry = config.entry;
let id = 0;

const createAST = filePath => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const ast = parser.parse(content, {
    sourceType: 'module'
  });
  let dependencies = [];
  traverse(ast, {
    CallExpression(p) {
      const node = p.node;
      if (node.callee.name === 'require') {
        node.callee.name = '__webpack_require__';
        let resultPath = node.arguments[0].value;
        resultPath = resultPath + (path.extname(resultPath) ? '' : 'js');
        dependencies.push(resultPath);
      }
    }
  });
  let code = generator(ast).code;
  let moduleId = id++;
  return {
    moduleId,
    filePath,
    code,
    dependencies
  };
};

const createGraph = entry => {
  const ast = createAST(entry);
  const queue = [ast];
  for (const item of queue) {
    const dirname = path.dirname(ast.filePath);
    item.dependencies.map(relativePath => {
      const absoPath = path.join(dirname, relativePath);
      const child = createAST(absoPath);
      queue.push(child);
    });
  }
  return queue;
}

const modules = createGraph(entry);
const entryId = modules[0].moduleId;

let code = [];
modules.map((item, index) => {
  const packCode = {
    id: modules[index].mapping,
    code: modules[index].code,
  };
  code.push(packCode);
});

let reg = new RegExp(/__webpack_require__\((.+?)\)/g);

code = code.map((item, index) => {
  if (item.code.match(reg)) {
    item = item.code.replace(reg, `__webpack_require__(${Object.values(item.id)})`);
  } else {
    item = item.code;
  }
  return item;
});

let { path, filename } = config.output;
let output = `${path}\\${filename}`;
let template = fs.readFileSync('./template.ejs', 'utf-8');

let package = ejs.render(template, {
  entryId,
  code
});

createAST(entry);
fs.writeFilrSync(output, package);
