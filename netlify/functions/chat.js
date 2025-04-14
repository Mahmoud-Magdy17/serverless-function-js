import { Client } from "@gradio/client";

let client;

export async function handler(event) {
  try {
    if (!client) {
      client = await Client.connect("mahmoud176203/chat_bot");
    }

    const params = new URLSearchParams(event.queryStringParameters);
    const text = params.get("text");

    if (!text) {
      return {
        statusCode: 400,
        body: "Please provide a 'text' parameter.",
      };
    }

    const result = await client.predict("/chat", {
      message: text,
      system_message: "You are a friendly chatbot.",
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.95,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(result.data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: `Error: ${err.message}`,
    };
  }
}
