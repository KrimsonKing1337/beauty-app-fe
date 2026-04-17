<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Button } from 'primevue';

import { Input } from '@/components';
import { useAuthStore } from '@/stores/authStore';
import { useLoginMutation } from '@/composables/mutations/auth/useLoginMutation';

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
    <div class="Background">
      <div class="Blur BlurTop" />
      <div class="Blur BlurBottom" />
    </div>

    <div class="Content">
      <section class="PageHero">
        <span class="Badge">
          Beauty App
        </span>

        <h1 class="PageTitle">
          Вход в личный кабинет
        </h1>

        <p class="Description">
          Храни историю процедур, расходы, фотографии и напоминания в одном месте.
        </p>
      </section>

      <section class="Card">
        <div class="CardHeader">
          <h2 class="CardTitle">
            Авторизация
          </h2>

          <p class="CardSubtitle">
            Введи логин и пароль, чтобы продолжить
          </p>
        </div>

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
      </section>
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

.Background {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.Blur {
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: rgba(217, 142, 161, 0.22);
  filter: blur(80px);
}

.BlurTop {
  top: -100px;
  right: -40px;
}

.BlurBottom {
  bottom: -120px;
  left: -60px;
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

.PageHero {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
}

.Badge {
  align-self: center;
  padding: 6px 12px;
  border: 1px solid rgba(217, 142, 161, 0.28);
  border-radius: 999px;
  font-size: var(--fs-caption);
  line-height: var(--lh-caption);
  font-weight: var(--fw-medium);
  color: var(--accent-hover);
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(10px);
}

.PageTitle {
  font-size: clamp(28px, 5vw, 36px);
  line-height: 1.12;
  font-weight: 700;
  color: var(--text-primary);
}

.Description {
  max-width: 360px;
  margin: 0 auto;
  color: var(--text-secondary);
}

.Card {
  padding: 24px;
  border: 1px solid rgba(236, 227, 231, 0.9);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 20px 60px rgba(43, 24, 31, 0.08);
  backdrop-filter: blur(18px);
}

.CardHeader {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.CardTitle {
  font-size: var(--fs-h2);
  line-height: var(--lh-h2);
  font-weight: var(--fw-semibold);
  color: var(--text-primary);
}

.CardSubtitle {
  color: var(--text-secondary);
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
