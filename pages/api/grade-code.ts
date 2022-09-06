import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function(req, res) {

  const {code} = req.body
  
  const completion = await openai.createCompletion({
    model: "code-davinci-002",
    prompt: `Explain what the following code is doing: ${code}`,
    temperature: 0,
    max_tokens: 64,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["\"\"\""],
  });
  res.status(200).json({ codeResult: completion.data.choices[0].text });
}
