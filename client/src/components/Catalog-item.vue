<template>
  <q-card class="my-card" flat bordered>
    <q-img :src="require('../assets/img/' + item_data.images)" />
    <q-card-section>
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">
          {{ item_data.title }}
        </div>
      </div>

      <q-rating v-model="item_data.rating" :max="5" size="32px" />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">{{ item_data.price }} $</div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat color="primary" @click="addCart(item_data)"> Add to cart </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "catalog-item",
  props: {
    item_data: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  setup () {
    const addCart = () => {
      this.$emit("addToCart", item_data.value)
    }
    return {};
  },

};
</script>
