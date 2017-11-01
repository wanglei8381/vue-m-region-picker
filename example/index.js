var Vue = require('vue');
Vue.component('region-picker', require('../src/region-picker.vue'));
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