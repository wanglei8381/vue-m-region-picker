require('./style.css');
var Vue = require('vue');
Vue.component('region-picker', require('../src'));
new Vue({
    el: '#container',
    data: function () {
        return {
            message: ''
        }
    },
    methods: {
        confirm(province, city, area){
            this.message = province.name + '/' + city.name + '/' + area.name;
        }
    }
});