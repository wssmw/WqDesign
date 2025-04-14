<template>
  <div>
    <Switch v-model="value" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(false);
</script>