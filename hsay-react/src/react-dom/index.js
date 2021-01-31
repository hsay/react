import {REACT_TEXT} from '../utils/constants';
/** 
 * @param {*} vdom 即React.createElemnet()DOM
 * @param {*} container 挂载点
 */
function render(vdom, container){
    console.log('render', vdom)    
    mount(vdom,container);
}
export function mount(vdom,container){
    let newDOM = createDOM(vdom);
    container.appendChild(newDOM);
}
/**
 * 把虚拟DOM变成真实DOM
 * @param {*} vdom 虚拟DOM
 */
export function createDOM(vdom){
    let {type,props}= vdom;
    let dom;
    if(type === REACT_TEXT){
        dom = document.createTextNode(props.content);
    }else if(typeof type === 'function'){//自定义的函数组件
        // TODO
    }else{ // 原生组件
        dom = document.createElement(type);
    }
    if(props){
        //使用虚拟DOM的属性更新刚创建出来的真实DOM的属性
        //updateProps(dom,{},props);
        //在这处理props.children属性
        //如果只有一个儿子，并且这个儿子是一个文本
        if(typeof props.children ==='object' && props.children.type){
            //把儿子变成真实DOM插到自己身上            
            mount(props.children,dom);
        //如果儿子是一个数组的话，说明儿子不止一个
        }else if(Array.isArray(props.children)){
            // TODO
            reconcileChildren(props.children,dom);
        }
    }
    //把真实DOM作为一个dom属性放在虚拟DOM。为以后更新做准备
    //当根据一个vdom创建出来一个真实DOM之后，真实DOM挂载到vdom.dom属性上
    vdom.dom = dom;
    return dom;
}
/**
 * 
 * @param {*} childrenVdom 儿子们的虚拟DOM
 * @param {*} parentDOM 父亲的真实DOM
 */
function reconcileChildren(childrenVdom,parentDOM){
    for(let i=0;i<childrenVdom.length;i++){
        let childVdom = childrenVdom[i];
        mount(childVdom,parentDOM);
    }
  }
const ReactDom = {
    render
}
export default ReactDom;