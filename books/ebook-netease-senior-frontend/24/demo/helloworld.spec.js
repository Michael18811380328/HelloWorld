import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld';
import Promise from 'es6-promise';
Promise.polyfill();

describe('Hello.vue', () => {
  // test render DOM
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HelloWorld);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h1').textContent).to.equal('Welcome to Michael App');
  });
  // test function
  it('test function', () => {
    const fn = vm.fn;
    expect(m1(2, 3)).to.equal(5);
  });
  // test async function
  it('test async function', () => {
    const fn2 = vm.fn2;
    fn2(1, 3, res => {
      expect(res).to.equal(4);
    });
  });
  // test API
  it('test axios API', () => {
    let axiosSpy = sinon.spy(axios, 'get');
    console.log(axiosSpy.callCount);
    let callback = sinon.spy(() => {
      return 10;
    });
    const getmes = vm.getmes;
    expect(getmes(callback)).to.equal(4);
  });
});

// tested component
// methods: {
//   fn1: function(a, b) {
//     return a + b;
//   },
//   fn2: function(a, b, fn) {
//     setTimeout(() => {
//       fn(a + b);
//     }, 1000);
//   },
//   getmes: function(fn) {
//     axios.get('www.bilibili.com');
//     let res = fn();
//     this.data = res;
//     return data;
//   }
// }
