## 项目搭建
从React.createElement()开始实现React主体逻辑，由于从react17开始，cra项目不再将jsx转换为React.createElement()调用，而是引入了分离的库react/jsx-runtime，所以在配置的时候添加DISABLE_NEW_JSX_TRANSFORM=true解决这个问题。
## createElement
问题思考1.入参是什么。2.返回是什么
### 1入参是什么
```html
<div>
    <span>123</span>
    <span>456</span>
</div>
```
编译阶段babel转化为：
```js
React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "123"), /*#__PURE__*/React.createElement("span", null, "456"));
```

```html
<div>
      123 {456}
</div>
```
编译阶段babel转化为：

```js
React.createElement("div", null, "123 ", 456);
```

通过以上例子就能很好的看到函数的入参形式了 type config children

### 2返回数据类型
```js
{
    type,
    ref,
    key,
    props
}
```
这里的返回值就是虚拟dom了。

## render函数
功能：实现虚拟DOM转化为真实DOM，并挂载到页面上
1.文本节点的渲染
2.原生组件的渲染,span div标签等。
3.函数组件的渲染
4.类组件的渲染
5.属性的添加以及更新

## 组件更新流程
