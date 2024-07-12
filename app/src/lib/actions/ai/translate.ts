import Groq from "groq-sdk";

export const TranslateText = async (text: string, lang: string) => {
  const apiKey = localStorage.getItem("apiKey");
  if (!apiKey) {
    return "Please set your API key first"
  }
  const chatCompletion = await getGroqChatCompletion(apiKey, text, lang);
  return chatCompletion.choices[0]?.message?.content || ""
}

const getGroqChatCompletion = async (apiKey: string, text: string,lang: string) => {
  const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true});

  const content = `Translate this text to ${lang} and only give me the response back:  ${text}`

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