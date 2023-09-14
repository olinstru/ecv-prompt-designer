<script setup>
    import ChatWindow from '../components/ChatWindow.vue'
    import PromptList from '../components/PromptList.vue'
    import PromptForm from '../components/PromptForm.vue'
    import { onMounted , computed} from 'vue'
    import { usePromptStore } from '@/stores/prompt'

    const store = usePromptStore()
    function selectPrompt(prompt){
        store.$patch({
            selectedPrompt : prompt
        })
    }
    function newPrompt(){
        store.resetPrompt()
    }
     function savePrompt(){
        store.savePrompt()
    }

</script>
<template>
    <h1 class="p-6 text-4xl flex align-center ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
        </svg>

        <span class="ml-4">ChatGPT Prompt Designer</span>
    </h1>
    <div class="flex">

        <div class="h-screen p-4 overflow-auto mb-2 flex-1">
            <prompt-list :prompts="store.prompts"  @edit="selectPrompt" @reset="newPrompt"/>
        </div>
         <div class="h-screen p-4 overflow-auto mb-2 flex-1">
            <prompt-form :prompt="store.selectedPrompt" @save="savePrompt" @submitPrompt="store.submitPromptToChatGPT"/>
        </div>
        <div class="h-screen p-4 overflow-auto flex-1">
            <chat-window :messages="store.messages" @submit="store.submitPromptToChatGPT"/>
        </div>

    </div>
</template>

