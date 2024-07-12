import Groq from "groq-sdk";

export const RewriteText = async (text: string) => {
  const apiKey = localStorage.getItem("apiKey");
  if (!apiKey) {
    return "Please set your API key first"
  }
  const chatCompletion = await getGroqChatCompletion(apiKey, text);
  return chatCompletion.choices[0]?.message?.content || ""
}

const getGroqChatCompletion = async (apiKey: string, text: string) => {
  const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true});

  const content = `Rephrase this sentence to be more reader-friendly and only give me the response back:  ${text}`

  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: "llama3-8b-8192",
  });
}