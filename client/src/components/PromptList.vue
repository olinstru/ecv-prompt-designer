<script setup>
    import {  defineProps , defineEmits    } from 'vue'
    import { usePromptStore } from '@/stores/prompt'
    
    const store = usePromptStore()
    const props = defineProps({
        prompts: Array
    })

    const emit = defineEmits(['edit', 'reset'])


</script>
<template>
    <div class="flex">
        <div>
            <div class="max-w-lg  mx-2 bg-white p-8 rounded-xl shadow shadow-slate-300 ">
                <div class="flex flex-row justify-between items-center ">
                    <div class="flex align-center w-full">
                        <h1 class="text-3xl font-medium flex-1 ">Prompts list</h1>
                        <span class="text-white bg-blue-700 hover:bg-blue-800 rounded-full p-0 cursor-pointer">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 ml-auto" @click.prevent="emit('reset')">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        </span>


                    </div>
                </div>

                <div id="prompts" class="my-5">
                    <div class="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent" v-for="prompt in props.prompts">
                        <div class="inline-flex items-center space-x-2 flex-1">
                            <div class="text-slate-500">{{prompt.attributes.title}}
                                <br />
                              <div class="text-slate-500 text-xs">
                                    <b>Context: </b> {{prompt.attributes.context}}
                                </div>
<!--                                  <div class="text-slate-500 text-xs">
                                    <b>Constraints: </b> {{prompt.attributes.constraints}}
                                </div>
                                <div class="text-slate-500 text-xs">
                                    <b>Default input: </b> {{prompt.attributes.defaultInput}}
                                </div>-->
                            </div>
                        </div>
                        <div class="flex ml-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-slate-500 hover:text-slate-700 hover:cursor-pointer mr-2" @click.prevent="emit('edit' , prompt)">>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-slate-500 hover:text-slate-700 hover:cursor-pointer" @click.prevent="store.deletePrompt(prompt.id)">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </div>
                    </div>
                </div>
                <p class="text-xs text-slate-500 text-center">
            <span>
                {{props.prompts.length}} prompt(s) found
            </span>
                </p>

            </div>
        </div>

    </div>



</template>

