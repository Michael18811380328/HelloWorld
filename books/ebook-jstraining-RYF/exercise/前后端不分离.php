<!-- 早期的界面前后端不分离，前端写界面，后端使用数据更新界面 -->
<!-- 前端负责视图层，后端负责控制器（C）和数据层（Model），以及和数据库交互 -->

<html>
  <head><title>Man {{ $man->name }}</title></head>
  <body>
    <h1>Man {{ $man->name }}</h1>
    <ul>
      <li>age: {{ $man->age }}</li>
    </ul>
  </body>
</html>

<!-- 早期前端无法直接获取数据。直到ajax出现后，前端可以独立获取数据 -->
<!-- 2004年后，前端从静态界面变成动态界面 web2.0 -->