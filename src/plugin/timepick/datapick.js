import Picker from './date';
import DatePanel from './panel/date'


const getPanel = function(type) {
    return DatePanel
}

export default {
    mixins: [Picker],
    name: 'DatePickers',
    watch: {
        type(type) {
            this.panel = getPanel(type)
        }
    },
    props: {
        type: {
            type: String,
            default: 'data'
        }
    },
    created() {
        this.panel = getPanel(this.type)
    }
}