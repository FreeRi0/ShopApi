<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-input filled v-model="email" label="Your email" hint="email" />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Your password"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import {useRouter} from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const email = ref(null);
    const password = ref(null);
    const router = useRouter();

    const onSubmit = async () => {
      await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      await router.push("/admin");
    };

    return {
      email,
      password,
      onSubmit
    };
  },
};
</script>
