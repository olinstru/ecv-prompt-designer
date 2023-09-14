<script setup>
import { defineProps, defineEmits } from 'vue'
import { usePromptStore } from '@/stores/prompt'
const store = usePromptStore()
import { storeToRefs } from "pinia";

const { selectedPrompt } = storeToRefs(store);
const emit = defineEmits(['save', 'submitPrompt'])

function sendMessage() {
    const message = `You will act as a ${store.selectedPrompt.attributes.role}`;
    emit('submitPrompt', message);
}

</script>
<template>
    <div>
        <div class="max-w-lg  mx-2 bg-white p-8 rounded-xl shadow shadow-slate-300 ">
            <div class="flex flex-row justify-between items-center">
                <div v-if="selectedPrompt.id">
                    <h1 class="text-3xl font-medium">Editing Prompt: #{{ selectedPrompt.id }}</h1>
                </div>
                <div v-else>
                    <h1 class="text-3xl font-medium">New prompt</h1>
                </div>
            </div>
            <form>
                <div class="my-4">
                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assistant
                        role</label>
                    <input v-model="selectedPrompt.attributes.title" type="text" id="title"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required placeholder="Title">
                </div>
                <div class="my-4">
                    <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assistant
                        role</label>
                    <input v-model="selectedPrompt.attributes.role" type="text" id="role"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required placeholder="You will act as a ...">
                </div>
                <div class="my-4">
                    <label for="context"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Context</label>
                    <textarea rows="5" v-model="selectedPrompt.attributes.context" id="context"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="I will provide the following information, and you will..." required></textarea>
                </div>
                <div class="my-6">
                    <label for="constraints"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Constraints</label>
                    <textarea rows="5" v-model="selectedPrompt.attributes.constraints" id="constraints"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="You should not..." required></textarea>
                </div>
                <div class="my-4">
                    <label for="input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                        input</label>
                    <input v-model="selectedPrompt.attributes.defaultInput" type="text" id="input"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>
                </div>

                <div>
                    <span class="loader mr-4" v-if="store.loadingAIResponse"></span>
                </div>

                <button type="submit"
                    class="inline-flex  align-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click.prevent="sendMessage">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                Submit
            </button>
            <button type="submit"
                class="inline-flex  ml-3 align-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click.prevent="emit('save')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                Save
            </button>

        </form>
    </div>
</div></template>