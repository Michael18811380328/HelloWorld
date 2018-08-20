export default {
  bindMethods(methods, obj) {
    methods.forEach((method) => {
      if(typeof obj[method] === 'function') {
        obj[method] = obj[method].bind(obj);
      }
    });
  }
};