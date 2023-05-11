<script setup lang="ts">
interface Props {
  color?: string;
  size?: string;
  thickness?: number;
  message?: string;
  showText?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: '3.5rem',
  thickness: 5,
  message: 'Loading...',
  showText: true,
});
</script>

<template>
  <div class="column items-center">
    <q-spinner-gears
      :size="props.size"
      :color="props.color"
      :thickness="props.thickness"
    />
    <span v-if="props.showText" class="q-mt-sm">{{ props.message }}</span>
  </div>
</template>

<style scoped></style>
