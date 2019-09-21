## 生命周期函数

首次执行
componentWillMount：在第一次render之前执行；组件一个生命周期中只执行一次。（适合于设置初始值，设置开始欢迎界面等等）这个阶段还没renderDOM树，所以不能获取与DOM树有关的内容。只能获取预设的属性。

compoenentDidMount：第一次render后执行：可以获得当前的DOM结构的内容。

更新界面函数（组件始终没有关闭，只涉及到数据的传递）：

compoenntWillReceiveProps：当组件之前获得的props，新获得的props不相同时，可以使用这个函数。这个函数必须在获得新的props执行（父组件重新渲染并传递新的props，如果父组件没有进行render，这个函数不会执行）（props变化执行的函数）

componentWillupdate：组件的state更新后执行的函数。这个函数的功能很强大，通常是组件更新后（state更新后执行的函数）；在这个函数中不能使用setState函数进行赋值（否则会死循环）

componentDidUpdate：这个函数使用也不少，组件已经更新后执行的函数。不能设置setState否则会死循环。

componentWillUnmount 这个函数在组件卸载时调用，主要清除无用的计时器，清除无用的事件绑定，取消网络请求等。如果一些代码会影响全局的情况，在这个阶段需要清理。

