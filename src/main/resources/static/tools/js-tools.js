

// 清空对象属性的全局方法
window.clearObjectProps = function(obj) {
    Object.keys(obj).forEach(key => {
        delete obj[key];
    });
}