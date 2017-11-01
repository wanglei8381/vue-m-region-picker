<template>
  <wag-region-picker-cpt :list="list" label="name" :confirm="confirm" :change="change">
    <slot></slot>
  </wag-region-picker-cpt>
</template>
<script type="text/babel">
  import areas from './areas'
  import picker from 'vue-m-picker'
  export default {
    components: { 'wag-region-picker-cpt': picker },
    data: function () {
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
      confirm(i, j, k){
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
      change(itemIndex, index) {
        if (this.type === 1)return;
        if (itemIndex === 0) {
          this.provincePicker(index);
        } else if (itemIndex === 1 && this.type === 3) {
          this.cityPicker(index);
        }
      },
      provincePicker(idx) {
        this.cityList = areas[1][idx];
        if (this.type === 2) {
          this.list.splice(1, 1, this.cityList);
        } else {
          this.areaList = areas[2][idx][0];
          this.list.splice(1, 2, this.cityList, this.areaList);
        }

        this.provinceIdx = idx;
      },
      cityPicker(idx) {
        this.areaList = areas[2][this.provinceIdx][idx];
        this.list.splice(2, 1, this.areaList);
      }
    },
    mounted () {
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
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .picker-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    -webkit-transition: opacity 400ms;
    transition: opacity 400ms;
    opacity: 0;
    text-align: left;
  }

  .picker-wrapper {
    position: fixed;
    width: 100%;
    z-index: 1;
    bottom: 0;
    left: 0;
    transition: transform 0.3s linear;
    -webkit-transition: -webkit-transform 0.3s linear;
    transform: translate3d(0, 250px, 0);
    -webkit-transform: translate3d(0, 250px, 0);
  }

  .picker-container.open {
    z-index: 2;
    opacity: 1;
  }

  .picker-container.open .picker-wrapper {
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }

  .picker-wrapper .picker-action {
    box-sizing: border-box;
    background-color: #ffffff;
    padding: 5px 10px;
    box-shadow: 0 -1px 3px 1px #dddddd;
    border-bottom: 1px solid #e5e5e5;
  }

  .picker-wrapper .picker-action .picker-btn {
    display: inline-block;
    outline: none;
    line-height: 1.42;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    color: #316ccb;
    text-decoration: none;
    white-space: nowrap;
  }

  .picker-wrapper .picker-action .picker-btn.picker-btn-confirm {
    float: right;
  }
</style>