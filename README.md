#vue-m-region-picker
 <h5>基于vue的移动端省市区选择工具</h5>
##Install
npm install vue-m-region-picker
##Use
<pre>
var Vue = require('vue');
Vue.component('region-picker', require('vue-m-region-picker'));
&lt;region-picker :type="3" @confirm="confirm">
&lt;button>选择地区&lt;／button>
&lt;/region-picker>

//通过props传值
props: {
    type: {//1:只有省,2:省市,3:省市区,默认是3
        type: Number,
        default: 3
    }
}
@confirm通知父组件
//具体用法看例子
</pre>
