/* eslint-disable */
export const STORE = {
    debug: true,
    state: {
        types: [],
        manufacturers: [],
        models:[],
        modifications: [],
        sections: [],
        parts: [],

        type: null,
        manufacturer: null,
        model: null,
        modification: null,
        section: null,
        part: null
    },
    
    set(field, newValue){
        if (this.debug) 
            console.log('set '+field+' вызвано с ', newValue);
        
        this.state[field] = newValue;
    },
    clear(field) {
        if (this.debug) 
            console.log('clear '+field+' вызвано');
        this.state[field] = null;
    }
}
