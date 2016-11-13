'use strict';

var areas = require('./areas');
module.exports = {
    template: require('./template.html'),
    components: { 'wag-region-picker-cpt': require('vue-m-picker') },
    data: function data() {
        return {
            list: []
        };
    },
    props: {
        type: {
            type: Number,
            default: 3
        }
    },
    methods: {
        confirm: function confirm(i, j, k) {
            var province = this.provinceList[i];
            var city = this.cityList[j];
            var area = this.areaList[k];
            if (this.type === 3) {
                this.$emit('confirm', province, city, area);
            } else if (this.type === 2) {
                this.$emit('confirm', province, city);
            } else if (this.type === 1) {
                this.$emit('confirm', province);
            }
        },
        change: function change(itemIndex, index) {
            if (this.type === 1) return;
            if (itemIndex === 0) {
                this.provincePicker(index);
            } else if (itemIndex === 1 && this.type === 3) {
                this.cityPicker(index);
            }
        },
        provincePicker: function provincePicker(idx) {
            this.cityList = areas[1][idx];
            if (this.type === 2) {
                this.list.splice(1, 1, this.cityList);
            } else {
                this.areaList = areas[2][idx][0];
                this.list.splice(1, 2, this.cityList, this.areaList);
            }

            this.provinceIdx = idx;
        },
        cityPicker: function cityPicker(idx) {
            this.areaList = areas[2][this.provinceIdx][idx];
            this.list.splice(2, 1, this.areaList);
        }
    },
    mounted: function mounted() {
        this.provinceIdx = 0;
        this.provinceList = areas[0];
        this.cityList = areas[1][0];
        this.areaList = areas[2][0][0];
        if (this.type === 1) {
            this.list = this.provinceList;
        } else if (this.type === 2) {
            this.list = [this.provinceList, this.cityList];
        } else if (this.type === 3) {
            this.list = [this.provinceList, this.cityList, this.areaList];
        }
    }
};