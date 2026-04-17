<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/authStore.ts';
import { useLoginMutation } from '@/composables/mutations/auth/useLoginMutation.ts';
import { Inputs, RememberMe, Buttons } from './components';

const router = useRouter();
const authStore = useAuthStore();
const loginMutation = useLoginMutation();

const form = reactive({
  login: '',
  password: '',
  rememberMe: true,
});

const isSubmitDisabled = computed(() => {
  return !form.login.trim() || !form.password.trim() || loginMutation.isPending.value;
});

const errorMessage = computed(() => {
  if (!(loginMutation.error.value instanceof Error)) {
    return '';
  }

  return loginMutation.error.value.message;
});

const submitHandler = async () => {
  loginMutation.reset();

  try {
    const result = await loginMutation.mutateAsync({
      login: form.login.trim(),
      password: form.password,
    });

    authStore.setAuth({
      accessToken: result.accessToken,
      user: result.user,
    });

    await router.push('/');
  } catch {
    // ошибка уже попадёт в loginMutation.error
  }
};
</script>

<template>
  <form class="Form" @submit.prevent="submitHandler">
    <Inputs v-model:login="form.login" v-model:password="form.password" />

    <div class="Row">
      <RememberMe v-model="form.rememberMe" />

      <button type="button" class="Link">
        Забыли пароль?
      </button>
    </div>

    <p v-if="errorMessage" class="Error">
      {{ errorMessage }}
    </p>

    <Buttons :isLoading="loginMutation.isPending.value" :isSubmitDisabled="isSubmitDisabled" />
  </form>
</template>

<style scoped lang="scss">
.Form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.Row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.Link {
  border: 0;
  font: inherit;
  color: var(--accent-hover);
  background: transparent;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}

.Error {
  padding: 12px 14px;
  border: 1px solid rgba(211, 122, 122, 0.28);
  border-radius: 14px;
  color: var(--danger);
  background: rgba(211, 122, 122, 0.08);
}

.Login,
.CreateAccount {
  width: 100%;
}

@media (max-width: 480px) {
  .Row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
