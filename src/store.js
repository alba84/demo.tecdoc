/* eslint-disable */
export default {
    debug: true,
    state: {
        type: 'passenger',
        brand: null,
        model: null,
        modification: null,
        section: null
    },
    set(field, newValue){
        if (this.debug) 
            console.log("set "+field+" вызвано с ", newValue);
        
        this.state[field] = newValue;
    },
    clear(field) {
        if (this.debug) 
            console.log("clear "+field+" вызвано");
        this.state[field] = null;
    }
}
