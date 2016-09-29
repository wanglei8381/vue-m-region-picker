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
            provincePicker: {},
            cityPicker: {},
            areaPicker: {},
            provinceIdx: 0,
            cityIdx: 0,
            areaIdx: 0,
            isWatch: false
        };
    },
    props: {
        open: {
            type: Boolean,
            required: true,
            twoWay: true
        },
        type: {
            type: Number,
            default: 1
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
    watch: {
        provinceIdx: function provinceIdx(idx) {
            if (!this.isWatch) return;
            this.cityList = areas[1][idx];
            this.areaList = areas[2][idx][0];
            this.cityPicker = this.cityList[0];
            this.areaPicker = this.areaList[0];
            this.cityIdx = 0;
            this.areaIdx = 0;
        },
        cityIdx: function cityIdx(idx) {
            if (!this.isWatch) return;
            this.areaList = areas[2][idx][0];
            this.areaPicker = this.areaList[0];
            this.areaIdx = 0;
        }
    },
    methods: {
        choose: function choose(method) {
            this.open = false;
            if (method == 'cancle') {
                return this[method]();
            }
            if (this.type === 3) {
                this[method](this.provincePicker, this.cityPicker, this.areaPicker);
            } else if (this.type === 2) {
                this[method](this.provincePicker, this.cityPicker);
            } else if (this.type === 1) {
                this[method](this.provincePicker);
            }
        }
    },
    ready: function ready() {
        var _this = this;

        this.provinceIdx = 1;
        this.cityIdx = 0;
        this.areaIdx = 1;
        this.provinceList = areas[0];
        this.cityList = areas[1][this.provinceIdx];
        this.areaList = areas[2][this.provinceIdx][this.cityIdx];
        this.provincePicker = this.provinceList[this.provinceIdx];
        this.cityPicker = this.cityList[this.cityIdx];
        this.areaPicker = this.areaList[this.areaIdx];
        window.addEventListener('click', function () {
            _this.open = false;
        });
        this.$nextTick(function () {
            _this.isWatch = true;
        });
    },

    components: {
        'region-picker-cpt': require('vue-m-picker')
    }
};