// Hook 规则
// ESLint 插件规范 eslint-plugin-react-hooks
// 规则：在React函数中使用Hook，在函数顶层使用Hook
// 避免在 if 条件判断内部使用，会出现顺序错误
// 如果必须条件判断，在useState内部执行
useEffect(function persistForm() {
  if (name !== '') {
    localStorage.setItem('formData', name);
  }
});
