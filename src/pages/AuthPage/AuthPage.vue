<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Button } from 'primevue';

import { Input } from '@/components';
import { useAuthStore } from '@/stores/authStore';
import { useLoginMutation } from '@/composables/mutations/auth/useLoginMutation';

import { Background, ContentHeader, CardHeader } from './components';

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
  <div class="AuthPage">
    <Background />

    <div class="Content">
      <ContentHeader />

      <div class="Card">
        <CardHeader />

        <form class="Form" @submit.prevent="submitHandler">
          <div class="FormFields">
            <Input v-model="form.login" id="auth-email">
              Логин
            </Input>

            <Input v-model="form.password" id="auth-password" type="password">
              Пароль
            </Input>
          </div>

          <div class="FormRow">
            <label class="FormCheckbox">
              <input v-model="form.rememberMe" id="auth-remember-me" type="checkbox">

              <span>
                Запомнить меня
              </span>
            </label>

            <button type="button" class="FormLink">
              Забыли пароль?
            </button>
          </div>

          <p v-if="errorMessage" class="FormError">
            {{ errorMessage }}
          </p>

          <Button
            class="FormSubmit"
            :loading="loginMutation.isPending.value"
            label="Войти"
            type="submit"
            fluid
            :disabled="isSubmitDisabled"
          />

          <div class="FormDivider">
            <span>
              или
            </span>
          </div>

          <Button
            class="FormSecondary"
            label="Создать аккаунт"
            severity="secondary"
            variant="outlined"
            type="button"
            fluid
          />
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.AuthPage {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(circle at top left, #fff6f8 0%, transparent 34%),
    radial-gradient(circle at bottom right, #f8e9ee 0%, transparent 30%),
    linear-gradient(180deg, #fcf9fa 0%, #f6f1f3 100%);
}

.Content {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 24px;
  align-content: center;
  width: 100%;
  max-width: 460px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 24px;
}

.Card {
  padding: 24px;
  border: 1px solid rgba(236, 227, 231, 0.9);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 20px 60px rgba(43, 24, 31, 0.08);
  backdrop-filter: blur(18px);
}

.Form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.FormFields {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.FormRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.FormCheckbox {
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

.FormLink {
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

.FormError {
  padding: 12px 14px;
  border: 1px solid rgba(211, 122, 122, 0.28);
  border-radius: 14px;
  color: var(--danger);
  background: rgba(211, 122, 122, 0.08);
}

.FormSubmit,
.FormSecondary {
  width: 100%;
}

.FormDivider {
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

@media (max-width: 480px) {
  .Content {
    padding: 16px;
  }

  .Card {
    padding: 20px;
    border-radius: 24px;
  }

  .FormRow {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
