<script setup lang="ts">
import { ref } from 'vue';

const model = ref(null);

const items = [
  {
    title: 'дорого',
    value: 0,
  },
  {
    title: 'дёшево',
    value: 1,
  },
  {
    title: 'говно',
    value: 2,
  },
  {
    title: 'подмышки',
    value: 3,
  },
];

// todo: VTextField через пробел создаёт тэги в чипсах,
//  дальше это отправляется на сервер в множественном варианте
</script>

<template>
  <div class="ProcedureTagsSelect isActive">
    <div class="SelectWrapper">
      <VSelect
        v-model="model"
        :items="items"
        label="Тэги"
        variant="outlined"
        bg-color="#fff"
        rounded="lg"
        chips
        multiple
        hide-details
      />

      <VBtn class="Button" color="pink-lighten-3">
        <VIcon icon="mdi-plus" />
      </VBtn>
    </div>

    <VTextField
      class="Input"
      label="Название нового тэга"
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
    />
  </div>
</template>

<style scoped lang="scss">
.ProcedureTagsSelect {
  border: 0 transparent solid;
  border-radius: 12px;
  padding: 0;
  transition: border 0.2s, padding 0.2s;
  margin-top: 32px;

  &.isActive {
    border: 1px #ccc solid;
    padding: 20px;
  }
}

.SelectWrapper {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.Button {
  border-radius: 16px;
  color: #fff;
  height: 32px;
  min-width: 52px;
}

.Input {
  margin-top: 18px;
}
</style>
