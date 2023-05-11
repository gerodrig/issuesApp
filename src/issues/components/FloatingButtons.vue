<script setup lang="ts">
import { computed } from 'vue';

//icon mandatory color? size? 'xs' | 'sm' action: () => void;
interface Props {
  buttons: FabButton[];
}

export interface FabButton {
  icon: string;
  color?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  action: () => void;
}

//define with defaults
const props = defineProps<Props>();

//define with defaults
const buttons = computed(() =>
  props.buttons.map((button) => ({
    ...button,
    color: button.color ?? 'primary',
    size: button.size ?? 'md',
  }))
);
</script>

<template>
  <div class="fab">
    <q-btn
      v-for="({ color, icon, size, action }, index) of buttons"
      :key="index"
      :class="buttons.length > 1 && `q-mr-sm`"
      round
      :color="color"
      :icon="icon"
      :size="size"
      @click="action"
    />
  </div>
</template>

<style scoped>
.fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
