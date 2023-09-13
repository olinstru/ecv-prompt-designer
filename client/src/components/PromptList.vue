<script setup>
    import { onMounted , computed} from 'vue'
    import { usePromptStore } from '@/stores/prompt'
    const store = usePromptStore()
    const prompts = computed(() => {
        return store.getPrompts;
    });
    const loading = computed(() => {
        return store.getLoading;
    });

    onMounted(() => {
        store.fetchPrompts({})
    })
</script>
<template>
    <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <div class="flex flex-row justify-between items-center">
            <div>
                <h1 class="text-3xl font-medium">Prompts list</h1>
            </div>
        </div>

        <div id="tasks" class="my-5">
            <div class="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent" v-for="prompt in prompts">
                <div class="inline-flex items-center space-x-2">
                    <div class="text-slate-500">{{prompt.attributes.title}}
                        <br />
                        <div class="text-slate-500 text-xs">{{prompt.attributes.context}}</div>
                    </div>
                </div>
                <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6  text-slate-500 hover:text-slate-700 hover:cursor-pointer mr-2" @click="store.submitPrompt(prompt)">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-slate-500 hover:text-slate-700 hover:cursor-pointer">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </div>
            </div>
        </div>
        <p class="text-xs text-slate-500 text-center">
            <span>
                {{prompts.length}} prompt(s) found
            </span>
        </p>

    </div>

    <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        Chat GPT Response:

        <div class="p-5 bg-gray-100 text-xs" >
            <span class="loader" v-if="loading"></span>
            <span v-else>{{store.AIResponse}}</span>
        </div>
    </div>
</template>

