<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Button } from 'primevue';
import { useAuthStore } from '@/stores/authStore.ts';
import { useLoginMutation } from '@/composables/mutations/auth/useLoginMutation.ts';
import { Input } from '@/components';

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
    <div class="Fields">
      <Input v-model="form.login" id="auth-email">
        Логин
      </Input>

      <Input v-model="form.password" id="auth-password" type="password">
        Пароль
      </Input>
    </div>

    <div class="Row">
      <label class="Checkbox">
        <input v-model="form.rememberMe" id="auth-remember-me" type="checkbox">

        <span>
          Запомнить меня
        </span>
      </label>

      <button type="button" class="Link">
        Забыли пароль?
      </button>
    </div>

    <p v-if="errorMessage" class="Error">
      {{ errorMessage }}
    </p>

    <Button
      class="Login"
      :loading="loginMutation.isPending.value"
      label="Войти"
      type="submit"
      fluid
      :disabled="isSubmitDisabled"
    />

    <div class="Divider">
      <span>
        или
      </span>
    </div>

    <Button
      class="CreateAccount"
      label="Создать аккаунт"
      severity="secondary"
      variant="outlined"
      type="button"
      fluid
    />
  </form>
</template>

<style scoped lang="scss">
.Form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.Fields {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.Row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.Checkbox {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;

  input {
    width: 16px;
    height: 16px;
    accent-color: var(--accent);
    cursor: pointer;
  }
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

.Divider {
  position: relative;
  text-align: center;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--border);
    transform: translateY(-50%);
  }

  span {
    position: relative;
    z-index: 1;
    display: inline-block;
    padding: 0 12px;
    font-size: 14px;
    color: var(--text-tertiary);
    background: rgba(255, 255, 255, 0.9);
  }
}
</style>
