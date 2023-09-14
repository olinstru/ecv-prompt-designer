import { defineStore } from 'pinia'

const defaultPrompt = {
  id: null,
  attributes: {
      role: '',
      context: '',
      constraints: '',
      defaultInput: ''
  }
};

export const usePromptStore = defineStore('prompt', {
    state: () => ({
        prompts: [],
        loading: false,
        AIResponse: '',
        selectedPrompt : defaultPrompt,
        messages: [],
        loadingAIResponse: false,
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
        resetPrompt(){
            this.selectedPrompt = defaultPrompt;
            this.messages = []
        },
        async fetchPrompts( query ) {
            try {
                this.loading = true;
                const response = await this.axios.get('/prompts?sort=id:desc' )
                this.prompts = response.data.data
                this.loading = false;
            }
            catch (error) {
                console.log(error)
                this.loading = false;
            }
        },

         async submitPromptToChatGPT( text ) {
             if(this.loadingAIResponse)
                 return;

            const message = {
                role: 'user',
                content: text
            }
            this.messages.push(message);

            try {
                this.loadingAIResponse = true;
                const response = await this.axios.post('/submit' ,  { messages : this.messages })
                this.messages.push(response.data);
                this.loadingAIResponse = false;
            }
            catch (error) {
                this.AIResponse = ''
                this.loadingAIResponse = false;
            }
        },

        async savePrompt(  ) {
            
            if(this.loading)
                return;

            try {
                this.loading = true;
                if(this.selectedPrompt.id){
                    const response = await this.axios.put('/prompts/' + this.selectedPrompt.id ,  { data : this.selectedPrompt.attributes })
                    this.loading = false;
                }
                else{
                    const response = await this.axios.post('/prompts' ,  { data : this.selectedPrompt.attributes })
                    this.loading = false;
                    await this.fetchPrompts()
                }



            }
            catch (error) {
                console.log(error.message)
                this.loading = false;
            }
        },

        async deletePrompt( promptID ) {
            
            if(this.loading)
                return;

            try {
                this.loading = true;

                const response = await this.axios.delete('/prompts/' + promptID ,  { data : this.selectedPrompt.attributes })
                this.loading = false;
                this.prompts = this.prompts.filter( (prompt) => {return prompt.id !== promptID });
            }
            catch (error) {
                console.log(error.message)
                this.loading = false;
            }
        },
    },
})