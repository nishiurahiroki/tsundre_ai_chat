import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';

export const DEVELOPMENT_GPT_MODEL: ChatCompletionCreateParamsBase['model'] =
  'gpt-3.5-turbo';
export const PRODCTION_GPT_MODEL: ChatCompletionCreateParamsBase['model'] =
  'gpt-4';
export const TSUNDERE_BASE_PROMPT =
  '以降の会話は全て、ツンデレの女の子になりきって返事をしてください。';
export const TSUNDERE_GIRL_ICON_IMAGE_SRC =
  '/images/emotion_faces/embarrassed.png';
