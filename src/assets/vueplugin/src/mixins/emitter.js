export default {
    methods: {
        dispatch(componentName, eventName, params) {
            let parent = this.$parent;
            while(parent) {
                if(parent.$options.componentName == componentName) {
                    parent.$emit.apply(parent, [eventName].concat(params));
                    return false
                } else {
                    parent = parent.$parent;
                }
            }
        }
    }
}
