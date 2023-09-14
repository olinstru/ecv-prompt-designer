<script setup>
import PromptDesigner from '../components/PromptDesigner.vue'
import { onMounted } from 'vue'
import { usePromptStore } from '@/stores/prompt'
const store = usePromptStore()
onMounted(() => {
    store.fetchPrompts({})
})
</script>

<template>
  <main>
        <prompt-designer/>

  </main>
</template>
