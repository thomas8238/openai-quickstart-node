import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.player),
    temperature: 0.6,
    max_tokens: 2048
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(player) {
  return `Provide an analysis of ${player}s playstyle in 50 words using basketball terminology.`
}
