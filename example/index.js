require('./style.css');
var Vue = require('vue');
Vue.component('region-picker', require('../src'));
new Vue({
    el: '#container',
    data: function () {
        return {
            message: '',
            open: false
        }
    },
    methods: {
        choose: function () {
            this.open = true;
        },
        cancle(){
            this.open = false;
        },
        confirm(province, city, area){
            this.open = false;
            this.message = province.name + '/' + city.name + '/' + area.name;
        }
    }
});