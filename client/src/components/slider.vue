<template>
  <div>
    <q-carousel
      arrows
      animated
      v-model="slide"
      height="400px"
    >
      <q-carousel-slide name="first" img-src="../assets/img/slider.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Small shop</div>
          <div class="text-subtitle1">in our store you will find many interesting things</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="second" img-src="../assets/img/slider2.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Convenience</div>
          <div class="text-subtitle1">Place orders from any device</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="third" img-src="../assets/img/slider3.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Always open</div>
          <div class="text-subtitle1">Our store is always open for our customers as it is online</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      slide: ref('first')
    }
  }
}
</script>