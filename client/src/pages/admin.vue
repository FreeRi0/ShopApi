<template>
  {{ message }}

  
</template>

<script>
import {onMounted, ref} from 'vue';
import { useCart } from "src/stores/user.ts";
export default {
  name: "Home",
  setup() {
    const message = ref('You are not logged in!');
    const store = useCart();

    onMounted(async () => {
      try {
        const response = await fetch('http://localhost:8000/api/auth/user', {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });

        const content = await response.json();

        message.value = `Hi ${content.username}`;

        await store.dispatch('setAuth', true);
      } catch (e) {
        await store.dispatch('setAuth', false);
      }
    });

    return {
      message
    }
  }
}
</script>