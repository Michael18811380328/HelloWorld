/*
备注：React.creatClass 和 class App extends Compnenent 方法的区别

总体：React.createClass是一个工厂函数，接受的参数是一个对象，传入的参数需要逗号隔开。class App extends Component 是ES6新规定，不用逗号。

在语法、propType和getDefaultProps、状态、this、Mixins这五个方面不同。
*/

// this is the test react file with ES6
// app.js is the beginning file of a react project

import React, { Component } from 'react';
import logo from '../images/index.jpg';
import '../css/index.css';

//ES6使用class定义构造函数
class App extends Component {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    //设置两个属性propTypes和defaultProps
    static propTypes = {
        name: React.PropTypes.string
    };
    static defaultProps = {
        name: ''
    };
    // 使用constructor定义默认的属性
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this); //在此绑定this也可以
        this.state = {
            isEditing: false
        }
        // 设置初始状态
    }
    // 在ES6中，属性不会自动绑定到react的实例上
    handleClick() {
        console.log(this);
        //null
    }
    handleFocus() {
        console.log(this);
        //react component instance 
        //手动绑定this（下文中）
    }
    handleBlur: () => {
        console.log(this);
        //react componnent instance 
        //使用箭头函数绑定this
    }
    render() {
        return ( <
            div className = "App" >
            <
            header className = "App-header" >
            <
            img src = { logo } className = s "APP-logo"
            alt = "logo" >
            <
            h1 className = "App-title" > I like React < /h1> <
            /header> <
            p className = "App-intro" >
            To get started, edit < code > src < /code> and save to reload. <
            /p> <
            input onClick = { this.handleClick } onFocus = { this.handleFocus.bind(this) } onBlur = { this.handleBlur } >
            <
            /div>
        );
    }
}

////在ES6中mixin的属性不能使用
=======
=======
>>>>>>> Stashed changes
	//设置两个属性propTypes和defaultProps
	static propTypes = {
		name: React.PropTypes.string
	};
	static defaultProps = {
		name:''
	};
	// 使用constructor定义默认的属性
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);//在此绑定this也可以
		this.state = {
			isEditing: false
		}
		// 设置初始状态
	}
	// 在ES6中，属性不会自动绑定到react的实例上
	handleClick(){
		console.log(this);
		//null
	}
	handleFocus(){
		console.log(this);
		//react component instance 
		//手动绑定this（下文中）
	}
	handleBlur: () => {
		console.log(this);
		//react componnent instance 
		//使用箭头函数绑定this
	}
	render() {
		return (
			<div className="App">
				<header className="App-header">
				<img src={ logo } className=s"APP-logo" alt="logo">
				<h1 className="App-title">I like React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code> src </code> and save to reload.
				</p>
				<input onClick={ this.handleClick } onFocus={ this.handleFocus.bind(this) } onBlur={ this.handleBlur }>
			</div>
		);
	}
}

/
//在ES6中mixin的属性不能使用
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes


//2. React.createClass——自己之前接触这个多一点，现在主要使用上面的方法。

import React from 'react';

const Contacts = React.createClass({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    //s使用propTypes和getDefaultProps设置获取prop
    propTypes: {
        name: React.PropTypes.string
    },
    getDefaultProps() {
        return {

        };
    },
    handleClick() {
        console.log(this);
    },
    //react component instance
    render() {
        return ( <
            div > < /div>
        );
    }
});

export default Contacts;
=======
=======
>>>>>>> Stashed changes
	//s使用propTypes和getDefaultProps设置获取prop
	propTypes:{
		name: React.PropTypes.string
	},
	getDefaultProps(){
		return {

		};
	},
	handleClick(){
		console.log(this);
	},
	//react component instance
	render(){
		return(
			<div></div>
		);
	}
});

export default Contacts;









<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
