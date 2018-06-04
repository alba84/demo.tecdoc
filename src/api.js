'use strict'
/* eslint-disable */
import {HTTP} from './http-common'

export const API = {
    get: (path, params, callback) => {
        params = params || {}

        HTTP.get(path, params)
        .then(response => {
            callback.call(this, response)
        })
        .catch(e => {
            console.log('Ошибка при обращении к АПИ: ', e)
        })
    },

    getTypes: callback => {
        API.get('/types', null, callback )
    },

    getManufacturers: (params, callback) => {
        API.get('/manufacturers/'+params.type, null, callback )
    },

    getModels: (params, callback) => {
        API.get('/models/'+params.type+'/'+params.manufacturer, null, callback )
    },

    getModifications: (params, callback) => {
        API.get('/modifications/'+params.type+'/'+params.model, null, callback )
    },

    getSections: (params, callback) => {
        API.get('/sections/'+params.type+'/'+params.modification, null, callback )
    },

    getParts: (params, callback) => {
        API.get('/parts/'+params.type+'/'+params.modification+'/'+params.section, null, callback )
    },

    getPartInfo: (params, callback) => {
        API.get('/part_info?supplier_id='+params.supplier_id+'&number='+encodeURIComponent(params.number), null, callback )
    },

    getAppliance: (params, callback) => {
        API.get('/appliance?supplier_id='+params.supplier_id+'&number='+encodeURIComponent(params.number), null, callback )
    },

    getCross: (params, callback) => {
        API.get('/cross?supplier_id='+params.supplier_id+'&number='+encodeURIComponent(params.number), null, callback )
    }

}
