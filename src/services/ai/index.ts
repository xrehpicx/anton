import OpenAI from 'openai';
import { env } from '@/lib/env';

// Types
export type chat_message = OpenAI.ChatCompletionMessageParam;
export type chat_response = OpenAI.ChatCompletionMessage;

// Core chat function with Go-style error handling
export async function chat_with_openai(
  messages: chat_message[],
  api_key?: string,
): Promise<[chat_response | null, Error | null]> {
  const client = new OpenAI({ apiKey: api_key ?? env.OPENAI_API_KEY });
  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });
    const choice = completion.choices[0];
    if (!choice) {
      return [null, new Error('No completion choice returned')];
    }
    return [choice.message, null];
  } catch (err: unknown) {
    return [null, err instanceof Error ? err : new Error(String(err))];
  }
}

// Alias for ask_anya
export const ask_anya = chat_with_openai;

// Init function to start the AI service
export async function init(): Promise<[boolean, Error | null]> {
  // Initialization logic if needed
  return [true, null];
}
