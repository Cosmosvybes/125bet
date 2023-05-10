const ai = require('openai')
const dotenv = require('dotenv')
dotenv.config()
const { Configuration, OpenAIApi } = ai

const config = new Configuration({
    apiKey: process.env.OPEN_AI_KEY
});

const gpt = new OpenAIApi(config);


export const askAnything = async (prompts) => {
    const response = await gpt.createCompletion({
        model: 'text-davinci-003',
        max_tokens: 1000,
        prompt: prompts
    })
    return response.data.choices[0].text 
}





