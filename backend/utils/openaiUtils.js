const openai = require('@openai/api');
const openAiInstance = new openai(process.env.OPENAI_API_KEY);


async function getAnswer(prompt) {
  try {
    const completion = await openAiInstance.createCompletion({
      engine: "text-davinci-003",
      prompt: prompt,
      temperature: 0.6,
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