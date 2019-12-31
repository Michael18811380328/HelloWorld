// React.Children APIs

function Father({children}) {
  console.log(React.Children.count(children));
  console.log(React.Children.only(children));
  let children1 = React.Children.toArray(children);
  console.log(children1.sort((a, b) => {a - b}).join(' '));
  return (
    <div>
      {React.Children.map(children, (child, index) => {
        <span>{index}</span>
      })}
    </div>
  );
}

<Father>
  hello world!
  {() => <span></span>}
</Father>

