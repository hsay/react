import React from './react';
import ReactDOM from './react-dom';
const a = '你好'
function Children() {
    return <div style={{color: 'green'}}>this is chilren</div>
}
class ChildrenCom extends React.Component{
    constructor(){
        super();
        this.state = {
            count: 1
        }
        setTimeout(() => {
            this.setState({
                count: 2
            })
        }, 3000)
    }
    render(){
        return <div style={{color: 'olive'}}>this is ChildrenCom {this.state.count}</div>
    }
}
ReactDOM.render(
  <div style={{color: 'red'}}>
      1234 <Children />
      <ChildrenCom />
  </div>,
  document.getElementById('root')
);

