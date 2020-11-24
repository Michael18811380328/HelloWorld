## react-select 内部类名

react-select 这个第三方组件，界面点击时，很难通过鼠标直接获取界面上的元素节点的类名

下面是偶然一次测试获取的类名

注意 react-select 的版本号对应

~~~html
<div class="css-kj6f9i-menu permission-editor__menu">
  <div class="css-11unzgr permission-editor__menu-list">
    <div class="css-1mhelce-option permission-editor__option permission-editor__option--is-focused" id="react-select-3-option-0" tabindex="-1">
      <div>可读写
        <div class="permission-editor-explanation">用户可以查看、修改表格。但是不能安装插件和共享表格。</div>
      </div>
    </div>
    <div class="css-fk865s-option permission-editor__option" id="react-select-3-option-1" tabindex="-1">
      <div>只读
        <div class="permission-editor-explanation">用户可以查看表格，但是不能修改。</div>
      </div>
    </div>
  </div>
</div>
~~~

