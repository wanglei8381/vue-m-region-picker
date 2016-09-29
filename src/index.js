require('./style.css');
var areas = require('./areas');
module.exports = {
    template: require('./template.html'),
    data: function () {
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
    watch: {
        provinceIdx(idx){
            if (!this.isWatch) return;
            this.cityList = areas[1][idx];
            this.areaList = areas[2][idx][0];
            this.cityPicker = this.cityList[0];
            this.areaPicker = this.areaList[0];
            this.cityIdx = 0;
            this.areaIdx = 0;
        },
        cityIdx(idx){
            if (!this.isWatch) return;
            this.areaList = areas[2][idx][0];
            this.areaPicker = this.areaList[0];
            this.areaIdx = 0;
        }
    },
    methods: {
        choose: function (method) {
            this.open = false;
            this[method](this.provincePicker, this.cityPicker, this.areaPicker);
        }
    },
    ready(){
        this.provinceIdx = 1;
        this.cityIdx = 0;
        this.areaIdx = 1;
        this.provinceList = areas[0];
        this.cityList = areas[1][this.provinceIdx];
        this.areaList = areas[2][this.provinceIdx][this.cityIdx];
        this.provincePicker = this.provinceList[this.provinceIdx];
        this.cityPicker = this.cityList[this.cityIdx];
        this.areaPicker = this.areaList[this.areaIdx];
        window.addEventListener('click', ()=> {
            this.open = false;
        });
        this.$nextTick(()=> {
            this.isWatch = true;
        });
    },
    components: {
        'region-picker-cpt': require('vue-m-picker')
    }
};