<template>
   <div class="">
        <!-- <head-top></head-top> -->
        <div class="pl30 pt20">
          <div class="welfare">
            <div class="headBan">
              <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">Slide 1</div>
                    <div class="swiper-slide">Slide 2</div>
                    <div class="swiper-slide">Slide 3</div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>

                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
            </div>
            <div class="h5Ban">

            </div>
          </div>
        </div>
   </div>
</template>
<script>
// import activityService from "../../../service/OperationManagement/activity";
import moment from '@/utils/moment'
import AppLoading from '../../OperationManagement/comm/loading.vue'
import headTop from '../../../components/headTop'
// import func from './vue-temp/vue-editor-bridge'

export default {
  data() {
    return {}
  },
  created() {},
  updated() {},
  components: {
    AppLoading,
    headTop
  },
  methods: {
    swip: function() {
      var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        loop: true,

        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      })
    }
  },
  computed: {},
  watch: {},
  mounted(){
    this.swip()
  }
}
</script>
<style lang="scss" scoped>
.swiper-container {
  width: 600px;
  height: 300px;
}
</style>
