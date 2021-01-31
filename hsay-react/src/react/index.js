import {wrapToVdom} from '../utils/'
import {Component} from '../component';
/**
 * 
 * @param {*} type 元素类型 字符串类型 函数类型
 * @param {*} config 
 * @param {*} children 儿子或儿子们
 * @return vdom
 */
function createElement(type, config, children){
    console.log(arguments)
    let ref;
    let key;
    if(config){
        delete config.__source;
        delete config.__self;
        ref = config.ref;
        delete config.ref;
        key = config.key;
        delete config.key;
    }
    let props = {...config};
    if(arguments.length>3){
       props.children=Array.prototype.slice.call(arguments,2).map(wrapToVdom);
    }else{
       props.children=wrapToVdom(children);
    }
    return {
        type,
        ref,
        key,
        props
    }
}
export default {
    createElement, 
    Component
       
}