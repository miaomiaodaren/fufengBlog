import Vue from 'vue';
const isServer = Vue.prototype.$isServer;
const nodeList = [];
const ctx = '@@clickoutsideContext';
let seed = 0;
let startClick;

const on = (function() {
    if (!isServer && document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

!Vue.prototype.$isServer && on(document, 'mousedown', e => (startClick = e));

!Vue.prototype.$isServer && on(document, 'mouseup', e => {
    nodeList.forEach(node => node[ctx].documentHandler(e, startClick));
});
  
export default {
    bind(el, binding, vnode) {
        nodeList.push(el);
        const id = seed++;
        const documentHandler = function(mouseup = {}, mousedown = {}) {
            if (!vnode.context ||
                !mouseup.target ||
                !mousedown.target ||
                el.contains(mouseup.target) ||
                el.contains(mousedown.target) ||
                el === mouseup.target ||
                (vnode.context.popperElm &&
                (vnode.context.popperElm.contains(mouseup.target) ||
                vnode.context.popperElm.contains(mousedown.target)))) return;
        
            if (binding.expression &&
                el[ctx].methodName &&
                vnode.context[el[ctx].methodName]) {
                vnode.context[el[ctx].methodName]();
            } else {
                el[ctx].bindingFn && el[ctx].bindingFn();
            }
        }
        el[ctx] = {
            id,
            documentHandler,
            methodName: binding.expression,
            bindingFn: binding.value
        };
    },
    update(el, binding) {
        el[ctx].methodName = binding.expression;
        el[ctx].bindingFn = binding.value;
    },
    
    unbind(el) {
        let len = nodeList.length;
        for (let i = 0; i < len; i++) {
            if (nodeList[i][ctx].id === el[ctx].id) {
                nodeList.splice(i, 1);
                break;
            }
        }
    }
}