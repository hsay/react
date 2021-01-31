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
    // 根据虚拟DOM生成真实DOM
    let newDOM = createDOM(vdom);
    // 将真实DOM挂载到父元素上
    container.appendChild(newDOM);
}
/**
 * 把虚拟DOM变成真实DOM 返回值为真实DOM
 * @param {*} vdom 虚拟DOM
 */
export function createDOM(vdom){
    let {type,props}= vdom;
    let dom;
    if(type === REACT_TEXT){
        dom = document.createTextNode(props.content);
    }else if(typeof type === 'function'){//自定义的函数组件
        // 函数组件 类组件的虚拟dom是没有dom属性的
        // 类组件
        if(type.isReactComponent){ // 类组件的静态属性
            return mountClassComponent(vdom)
        }
        // 函数组件
        return mountFunctionComponent(vdom);
    }else{ // 原生组件
        dom = document.createElement(type);
    }
    // 处理children， 以上生成的dom会作为所有children的container
    if(props){
        //使用虚拟DOM的属性更新刚创建出来的真实DOM的属性
        updateProps(dom,{},props);
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
 * 查找此虚拟DOM对应的真实DOM
 * @param {*} vdom 
 */
export function findDOM(vdom){
    let {type}= vdom;
    let dom;
    if(typeof type === 'function'){ //如果是组件的话
        dom=findDOM(vdom.oldRenderVdom); // 这里的oldRenderVdom即函数组件返回值构成的虚拟DOM,或者类组件render的
        // 返回值构成的虚拟DOM
    }else{ // 普通的字符串，那说明它是一个原生组件。dom指向真实DOM
        dom=vdom.dom;
    }
    return dom;
}
/**
 * 渲染类组件
 */
function mountClassComponent(vdom){
    const {type, props} = vdom;
    const classInstance = new type(props);
    const oldRenderVdom = classInstance.render();
    classInstance.oldRenderVdom = vdom.oldRenderVdom = oldRenderVdom;
    let dom =  createDOM(oldRenderVdom);
    return dom;
}
/**
 * 返回值需是真实DOM
 * @param {*} vdom 
 */
function mountFunctionComponent(vdom){
    const {type, props} = vdom;
    const oldRenderVdom = type(props);
    vdom.oldRenderVdom = oldRenderVdom;    
    return createDOM(oldRenderVdom);
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
/**
 * 使用虚拟DOM的属性更新刚创建出来的真实DOM的属性
 * @param {*} dom 真实DOM
 * @param {*} newProps 新属性对象 
 */
function updateProps(dom,oldProps,newProps){
    for(let key in newProps){
        if(key === 'children') continue;//单独处理,不在此处处理
        if(key === 'style'){
          let styleObj = newProps.style;
          for(let attr in styleObj){
              dom.style[attr]=styleObj[attr];
          }
        }else{//在JS中 dom.className='title'
            dom[key]= newProps[key];
        }
    }
  }
const ReactDom = {
    render
}
export default ReactDom;