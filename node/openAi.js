import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    "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",
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [{ role: "user", content: "write a haiku about ai" }],
});

completion.then((result) => console.log(result.choices[0].message));
