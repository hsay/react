import {createDOM, findDOM} from '../react-dom'
export class Component {
    static isReactComponent = true
    constructor(props){
        this.props = props;
        this.state = {}
    }
    setState(partialState){
        this.state = {
            ...this.state,
            ...partialState
        }
        this.updateComponent();
    }
    updateComponent(){
        let newRenderVdom= this.render();
        let oldDOM = findDOM(this.oldRenderVdom); // 这里找到的oldDom就是 组件渲染之后的真是doms
        let newDOM = createDOM(newRenderVdom);
        oldDOM.parentNode.replaceChild(newDOM, oldDOM);
        this.oldRenderVdom=newRenderVdom;
    }
}
 