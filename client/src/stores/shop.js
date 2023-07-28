import { defineStore } from "pinia";
import { data } from "src/queries/queries";
import { useQuery } from "@vue/apollo-composable";
import { computed, defineComponent, ref } from "vue";

export const useCart = defineStore("counter", {
  state: () => ({
    cart: [],
    goods: [],
    total: 0,
  }),


  getters: {
    CART(state) {
      return computed(() => state.cart);
    },
    GOODS(state) {
      return computed(() => state.goods);
    },
  },

  actions: {
    VIEWGOODS() {
      const { result, loading, error } = useQuery(data);
      this.goods = computed(() => result.value?.shop_goods ?? []);
    },
    ADDTOCART(crt) {
      if (this.cart.length) {
        console.log("true");
        let isProductExists = false;
        this.cart.map((i) => {
          if (i.id === crt.id) {
            isProductExists = true;
            i.quantity++;
            this.total += i.price
          }
          return i;
        });
        if (!isProductExists) {
          this.cart.push(crt);
          this.total += crt.price
          crt.quantity = 1
        }
      } else {
        this.total += crt.price
        crt.quantity = 1
        this.cart.push(crt);
      }
    },
    DELETEFROMCART(item) {
      console.log(item);
      const itemIndex = this.cart.findIndex((i) => i === item);
      if (item.quantity > 1) {
        this.total -= item.price
        item.quantity--
      } else {
        this.total -= item.price
        this.cart.splice(itemIndex, 1)
      }
    },

    INCREMENT (index){
      this.cart[index].quantity++;
      this.total+=this.cart[index].price
    },
    DECREMENT (index){
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
        this.total-=this.cart[index].price
      } else {
        this.total-=this.cart[index].price
        this.cart.splice(index, 1);
      }
    },
  },
});
