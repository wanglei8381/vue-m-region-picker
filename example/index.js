require('./style.css');
var Vue = require('Vue');
Vue.component('region-picker', require('../src'));
new Vue({
    el: 'body',
    data: {
        message: '',
        open: false
    },
    methods: {
        choose: function () {
            this.open = true;
        },
        cancle(){
            console.log('--->cancle');
        },
        confirm(province, city, area){
            console.log('--->confirm');
            this.message = province.name + '/' + city.name + '/' + area.name;
        }
    },
    ready(){
    }
});