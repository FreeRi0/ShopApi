<template>
  <q-page class="flex flex-center">
    <p v-if="!shopgoods.length" class="v-cart__not-found">
      Товаров в корзине не обнаружено... купи че нибудь по братски
    </p>
    <div
      class="q-pa-md row items-start q-gutter-md"
      v-for="(item, index) of shopgoods"
      :key="item.id"
    >
      <q-card class="my-card" flat bordered>
        <router-link :to="{ path: '/Info' }">
          <q-img :src="require('../assets/img/' + item.images)" />
        </router-link>
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ item.title }}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">{{ item.price }} $</div>
        </q-card-section>

        <q-separator />
        <div class="v-cart-item__quantity">
          <p class="v-cart-item__quantity_text">Количество:</p>
          <span class="v-cart-item__quantity_count">
            <span class="v-cart-item__decrement" @click="decrementItem(index)"
              >-</span
            >
            {{ item.quantity }}
            <span class="v-cart-item__increment" @click="incrementItem(index)"
              >+</span
            >
          </span>
        </div>

        <q-card-actions>
          <q-btn flat color="primary" @click="deleteCart(item)">
            Delete to cart
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
  <div class="cart__total">
    <q-button v-if="shopgoods.length" class="order_btn" @click="order = true"
      >Заказать</q-button
    >
    <p class="cart__total_name">Итого:</p>
    <p>{{ store.total }} $</p>
  </div>
  <q-dialog v-model="order">
    <div class="order">
      <p class="order__text">Order Form</p>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="name"
          label="Your name *"
          hint="Name and surname"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          type="email"
          v-model="email"
          label="Your email *"
          lazy-rules
          :rules="[(val) => !!val || 'Email is missing', isValidEmail()]"
        />

        <q-input
          filled
          type="text"
          v-model="adress"
          label="Your adress *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-dialog>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useCart } from "src/stores/shop.js";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "Cart",
  setup() {
    const name = ref(null);
    const email = ref(null);
    const adress = ref(null);
    const accept = ref(false);
    const store = useCart();
    const $q = useQuasar();
    const shopgoods = store.cart;
    const deleteCart = (item) => {
      console.log(item);
      store.DELETEFROMCART(item);
      $q.notify({
        message: "item remove from cart.",
        caption: "5 minutes ago",
        color: "secondary",
      });
    };
    const incrementItem = (index) => {
      store.INCREMENT(index);
    };

    const decrementItem = (index) => {
      store.DECREMENT(index);
    };

    const isValidEmail = () => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(email.value) || "Invalid email";
    };

    return {
      shopgoods,
      deleteCart,
      decrementItem,
      incrementItem,
      store,
      order: ref(false),
      name,
      email: "",
      adress,
      accept,
      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Ошибочка. Что то вы явно не договариваете нам",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Данные об вашем заказе отправленны вам на почту",
          });
        }
      },
      onReset() {
        name.value = null;
        email.value = null;
        adress.value = null;
        accept.value = false;
      },
      isValidEmail
    };
  },
});
</script>

<style lang="scss">
.v-cart-item {
  &__quantity {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  &__decrement,
  &__increment {
    cursor: pointer;
    border-radius: 100%;
    color: #fff;
    padding: 6px;
    background: $accent;
  }
  &__quantity_text {
    font-size: 18px;
  }
}

.order_btn {
  width: 150px;
  padding: 10px;
  height: 45px;
  background: $accent;
  text-align: center;
  border: 0px;
  border-radius: 15px;
  cursor: pointer;
  margin-right: 25px;
}
.cart__total {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $secondary;
  color: #fff;
  font-size: 20px;
  &_name {
    margin-right: 15px;
  }
}
p {
  margin: 0;
}

.order {
  background: white;
  padding: 25px;
  border-radius: 10px;
}
</style>
