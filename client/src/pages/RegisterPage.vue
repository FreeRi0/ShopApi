<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input filled v-model="name" label="Your name *" />

      <q-input filled type="email" v-model="email" label="Your email *" />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Your password *"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const name = ref(null);
    const email = ref(null);
    const password = ref(null);

    const router = useRouter();

    const onSubmit = async () => {
      await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      await router.push("/login");
    };

    return {
      name,
      email,
      password,
      onSubmit,
    };
  },
};
</script>
