<script setup>
    import {  defineProps , defineEmits , ref } from 'vue'

    const props = defineProps({
        messages : Array
    })
    const emit = defineEmits(['submit'])
    const message = ref('')
    function sendMessage( ){
        emit('submit' , message.value);
        message.value = ''
    }
</script>
<template>
    <div >
        <div class="max-w-lg  mx-2 bg-white p-8 rounded-xl shadow shadow-slate-300 ">
            <div class="flex flex-row justify-between items-center mb-6">
                <div>
                    <h1 class="text-3xl font-medium">ChatGPT</h1>
                </div>
            </div>
            <div v-for="message in messages">
                <div class="flex w-full my-4 space-x-3 max-w-xs " v-if="message.role === 'assistant'">
                    <div class="flex-shrink-0 h-8 w-8 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                        </svg>
                    </div>
                    <div>
                        <div class="bg-gray-100 p-2 rounded-r-lg rounded-bl-lg">
                            <p class="text-xs">{{message.content}}</p>
                        </div>
                    </div>
                </div>

                <div class="flex w-full my-4 space-x-3 max-w-xs ml-auto justify-end" v-else>
                    <div>
                        <div class="bg-blue-600 text-white p-2 rounded-l-lg rounded-br-lg">
                            <p class="text-xs">{{message.content}}</p>
                        </div>
                    </div>
                    <div class="flex-shrink-0 h-8 w-8 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>
            </div>


            <form class="  flex justify-center align-center mt-12">
                <input v-model="message" class="items-center h-10 w-full rounded border px-3 text-sm" type="text" placeholder="Type your message…" required>

                <button type="submit" class="text-sm flex  ml-4 align-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click.prevent="sendMessage">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>