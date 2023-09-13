import { defineStore } from 'pinia'


export const usePromptStore = defineStore('prompt', {
    state: () => ({
        prompts: [],
        loading: false,
        AIResponse: ''
    }),
    getters: {
        getPrompts(state){
            return state.prompts
        },
        getLoading(state){
            return state.loading
        },
        getAIResponse(state){
            return state.AIResponse
        }

    },
    actions: {
        async fetchPrompts( query ) {
            try {
                this.loading = true;
                const response = await this.axios.get('/prompts' )
                this.prompts = response.data.data
                this.loading = false;
            }
            catch (error) {
                console.log(error)
                this.loading = false;
            }
        },
         async submitPrompt( prompt ) {

            if(this.loading)
                return;

            try {
                this.loading = true;
                const response = await this.axios.post('/submit' ,  { data : prompt })
                this.AIResponse = response.data.content
                this.loading = false;
            }
            catch (error) {
                this.AIResponse = ''
                this.loading = false;
            }
        },

    },
})