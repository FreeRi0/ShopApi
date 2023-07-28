<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="MainTitle">
          <router-link :to="{ path: '/' }">Shop</router-link>
        </q-toolbar-title>
        <div class="shop_cart">
          <router-link :to="{ path: '/Cart' }"
            ><img src="../assets/Cart.png" alt="cart" /> {{ shopgoods.length }}
          </router-link>
        </div>
        <!-- <q-item id="auth-links">
          <q-btn
            class="actions-header_login"
            label="Войти"
            type="button"
            @click="login"
          />
        </q-item>
        <div class="q-ml-md">
          <div id="user-button"></div>
        </div> -->
        
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.MainTitle a {
  color: white;
  text-decoration: none;
  font-size: 32px;
}
.shop_cart {
  padding: 15px;
  display: flex;
  align-items: center;
  font-size: 20px;
  a {
    text-decoration: none;
    color: red;
  }
}
</style>

<script>
import { defineComponent, ref } from "vue";
import { useCart } from "src/stores/shop.js";
import { login, logout } from "../sdk/user";
import { Clerk } from "@clerk/clerk-js";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const store = useCart();
    const shopgoods = store.cart;
    const publishableKey =
      "pk_test_dmFsaWQtcGFyYWtlZXQtNjUuY2xlcmsuYWNjb3VudHMuZGV2JA";
    const script = document.createElement("script");
    script.setAttribute("data-clerk-publishable-key", publishableKey);
    script.async = true;
    script.src = `https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`;
    script.crossOrigin = "anonymous";
    script.addEventListener("load", async function () {
      await window.Clerk.load();

      const userButton = document.getElementById("user-button");
      const authLinks = document.getElementById("auth-links");

      window.Clerk.addListener(({ user }) => {
        authLinks.style.display = user ? "none" : "";
      });

      if (window.Clerk.user) {
        window.Clerk.mountUserButton(userButton);
        userButton.style.margin = "auto";

        localStorage.setItem("session_id", window.Clerk.session.id);
      }
    });
    document.body.appendChild(script);
    return {
      shopgoods,
      login,
      logout,
    };
  },
});
</script>
