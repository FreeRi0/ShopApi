<template>
  <slider></slider>
  <h3 class="text-center">Our Goods</h3>
  <div class="flex flex-center">
    <q-input class="q-ml-md" v-model="searchGoods" label="Search goods" />
    <!-- <div class="range-slider">
      <input
        type="range"
        min="0"
        max="1500"
        step="10"
        v-model.number="minPrice"
        @change="setRange"
      />
      <input
        type="range"
        min="0"
        max="1500"
        step="10"
        v-model.number="maxPrice"
        @change="setRange"
      />
    </div>
    <div class="range-values">
      <p>Min: {{ minPrice }}</p>
      <p>Max: {{ maxPrice }}</p>
    </div> -->
    <div class="column bg-green flex items-center q-ml-xl">
      <q-select
        filled
        color="blue"
        dark
        v-model="sortedProducts"
        :options="sortParams"
        :select="selectSort(sortedProducts)"
        label="Сортирвать по рейтингу"
        class="flex-center flex justify-end"
      />
    </div>
    <div class="column bg-green flex items-center q-ml-xl">
      <q-select
        filled
        color="blue"
        v-model="model"
        :options="options"
        dark
        :select="sortByGoods(model)"
        class="flex-center flex justify-end"
      />
    </div>
  </div>

  <q-page class="flex flex-center">
    <div
      class="q-pa-md row items-start q-gutter-md"
      v-for="item of sor"
      :key="item.id"
    >
      <q-card class="my-card" flat bordered>
        <q-img :src="require('../assets/img/' + item.images)" />

        <q-card-section>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ item.title }}</div>
          <q-rating v-model="item.rating" :max="5" size="32px" />
          <div class="text-subtitle1">{{ item.price }} $</div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat color="primary" @click="addCart(item)">
            Add to cart
          </q-btn>

          <q-space />

          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
          />
        </q-card-actions>

        <q-slide-transition>
          <div v-show="expanded">
            <q-separator />
            <q-card-section class="text-subitle2">
              {{ item.description }}
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import slider from "src/components/slider.vue";
import CartItem from "src/components/Cart-Item.vue";
import { computed, defineComponent, ref } from "vue";
import { useCart } from "src/stores/shop.js";
import { useQuasar } from "quasar";
export default {
  components: {
    slider,
    CartItem,
  },
  setup() {
    const store = useCart();
    const $q = useQuasar();
    store.VIEWGOODS();
    const shopgoods = store.GOODS;
    const sortedProducts = ref([]);
    const searchGoods = ref("");
    const model = ref("All");
    // const minPrice = ref(0);
    // const maxPrice = ref(1500);
    const options = [
      {
        label: "smartphones",
        value: "smartphones",
      },
      { label: "laptops", value: "laptops" },
      { label: "skincare", value: "skincare" },
      { label: "groceries", value: "groceries" },
      { label: "fragrances", value: "fragrances" },
      { label: "home-decoration", value: "home-decoration" },
      { label: "all", value: "All" },
    ];
    const sortParams = [
      {
        label: "По возрастанию",
        value: "По возрастанию",
      },
      {
        label: "По убыванию",
        value: "По убыванию",
      },
    ];

    const addCart = (item) => {
      $q.notify({
        message: "item add to cart.",
        color: "secondary",
      });
      const crt = { ...item };
      store.ADDTOCART(crt, item);
    };

    const sortByGoods = (model) => {
      sortedProducts.value.length = 0;
      shopgoods.value.map((elem) => {
        if (elem.category === model.value) {
          sortedProducts.value.push(elem);
        } else {
          return;
        }
      });
    };

    const arrt = computed(() => {
      if (sortedProducts.value.length) {
        return sortedProducts.value;
      } else {
        return shopgoods.value;
      }
    });

    const sor = computed(() => {
      return arrt.value.filter((item) => {
        return item.title
          .toLowerCase()
          .includes(searchGoods.value.toLowerCase());
      });
    });

    // const setRange = () => {
    //   if (minPrice.value > maxPrice.value) {
    //     let tmp = maxPrice.value;
    //     maxPrice.value = minPrice.value;
    //     minPrice.value = tmp;
    //   }
    //   sortedProducts.value = [...shopgoods.value];
    //   sortedProducts.value = sortedProducts.value.filter(function (item) {
    //     return item.price >= minPrice.value && item.price <= maxPrice.value;
    //   });
    // };

    const sortedGoods = ref("По рейтингу");
    const sortByAsc = (d1, d2) => {
      return d1.rating > d2.rating ? 1 : -1;
    };
    const sortByDesk = (d1, d2) => {
      return d1.rating < d2.rating ? 1 : -1;
    };
    const selectSort = (option) => {
      switch (option.value) {
        case "По возрастанию":
          return sor.value.sort(sortByAsc);
        case "По убыванию":
          return sor.value.sort(sortByDesk);
      }
    };

    return {
      store,
      shopgoods,
      addCart,
      searchGoods,
      sortedProducts,
      sor,
      arrt,
      options,
      expanded: ref(false),
      model,
      sortByGoods,
      sortedGoods,
      selectSort,
      sortParams
    };
  },
};
</script>

<style lang="scss">
.range-slider {
  width: 200px;
  margin: auto 16px;
  text-align: center;
  position: relative;
}

.range-slider svg,
.range-slider input[type="range"] {
  position: absolute;
  left: 0;
  bottom: 0;
}

input[type="range"]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  top: 2px;
  margin-top: -7px;
}

.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
