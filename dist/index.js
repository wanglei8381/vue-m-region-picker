'use strict';

require('./style.css');
var areas = require('./areas');
module.exports = {
    template: require('./template.html'),
    data: function data() {
        return {
            provinceList: [],
            cityList: [],
            areaList: [],
            province: {},
            city: {},
            area: {},
            provinceIdx: 0,
            cityIdx: 0,
            areaIdx: 0
        };
    },
    props: {
        open: {
            type: Boolean,
            required: true
        },
        type: {
            type: Number,
            default: 3
        },
        cancle: {
            type: Function
        },
        confirm: {
            type: Function,
            required: true
        }
    },
    computed: {
        style: function style() {
            if (this.type === 3) {
                return {
                    width: '33.333%',
                    float: 'left'
                };
            } else if (this.type === 2) {
                return {
                    width: '50%',
                    float: 'left'
                };
            } else if (this.type === 1) {
                return {
                    width: '100%'
                };
            }
        }
    },
    methods: {
        'provincepicker': function provincepicker(item, idx) {
            this.cityList = areas[1][idx];
            this.areaList = areas[2][idx][0];
            this.province = item;
            this.city = this.cityList[0];
            this.area = this.areaList[0];
            this.provinceIdx = idx;
            this.cityIdx = 0;
            this.areaIdx = 0;
        },
        'citypicker': function citypicker(item, idx) {
            this.areaList = areas[2][this.provinceIdx][idx];
            this.city = item;
            this.area = this.areaList[0];
            this.areaIdx = 0;
        },
        'areapicker': function areapicker(item, index) {
            this.area = item;
            this.areaIdx = index;
        },
        choose: function choose(method) {
            if (method == 'cancle') {
                return this[method]();
            }
            if (this.type === 3) {
                this[method](this.province, this.city, this.area);
            } else if (this.type === 2) {
                this[method](this.province, this.city);
            } else if (this.type === 1) {
                this[method](this.province);
            }
        }
    },
    mounted: function mounted() {
        this.provinceList = areas[0];
        this.cityList = areas[1][this.provinceIdx];
        this.areaList = areas[2][this.provinceIdx][this.cityIdx];
        this.province = this.provinceList[this.provinceIdx];
        this.city = this.cityList[this.cityIdx];
        this.area = this.areaList[this.areaIdx];
    },

    components: {
        'region-picker-cpt': require('vue-m-picker')
    }
};