export const MAX_INPUT_LENGTH = 2000;
export const MAX_TOKENS_HARD_CAP = 2000;
export const MIN_TOKENS = 50;
export const RATE_LIMIT_MS = 2000; // 1 message per 2s per session

export type GuardrailError = {
  code: 'session_limit_reached' | 'daily_limit_reached' | 'input_too_long' | 'rate_limited' | 'empty_message';
  message: string;
  httpStatus: number;
};

export function validateInput(message: string): GuardrailError | null {
  const trimmed = message.trim();
  if (!trimmed) {
    return {
      code: 'empty_message',
      message: 'Please enter a message before sending.',
      httpStatus: 400,
    };
  }
  if (message.length > MAX_INPUT_LENGTH) {
    return {
      code: 'input_too_long',
      message: 'Please keep your message under 2000 characters.',
      httpStatus: 400,
    };
  }
  return null;
}

export function clampMaxTokens(value: number): number {
  if (!Number.isFinite(value) || value < MIN_TOKENS) return MIN_TOKENS;
  if (value > MAX_TOKENS_HARD_CAP) return MAX_TOKENS_HARD_CAP;
  return Math.round(value);
}

export function todayDate(): string {
  return new Date().toISOString().slice(0, 10);
}
