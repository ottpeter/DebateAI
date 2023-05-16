const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getAnswer(prompt) {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2048,
      temperature: 0.8,
    });
    return {
      success: true,
      text: completion.data.choices[0].text
    };
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return {
        success: false,
        error: error.response.data
      }
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return {
        success: false,
        error: "An error occurred during your request."
      }
    }
  }
}

module.exports = {
  getAnswer
}