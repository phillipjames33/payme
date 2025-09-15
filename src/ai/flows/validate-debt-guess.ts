'use server';

/**
 * @fileOverview Flow for validating a user's debt guess against the actual debt amount.
 *
 * Exports:
 *   - validateDebtGuess: Function to validate the debt guess.
 *   - ValidateDebtGuessInput: Input type for the validateDebtGuess function.
 *   - ValidateDebtGuessOutput: Output type for the validateDebtGuess function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateDebtGuessInputSchema = z.object({
  guessAmount: z
    .number()
    .describe('The user provided guess for the debt amount.'),
  actualAmount: z.number().describe('The actual debt amount.'),
});
export type ValidateDebtGuessInput = z.infer<typeof ValidateDebtGuessInputSchema>;

const ValidateDebtGuessOutputSchema = z.object({
  isClose: z
    .boolean()
    .describe(
      'True if the guess is within a reasonable range of the actual amount, false otherwise.'
    ),
  feedbackMessage: z
    .string()
    .describe(
      'A message providing feedback to the user on how close their guess is to the actual amount.'
    ),
});
export type ValidateDebtGuessOutput = z.infer<typeof ValidateDebtGuessOutputSchema>;

export async function validateDebtGuess(input: ValidateDebtGuessInput): Promise<ValidateDebtGuessOutput> {
  return validateDebtGuessFlow(input);
}

const validateDebtGuessPrompt = ai.definePrompt({
  name: 'validateDebtGuessPrompt',
  input: {schema: ValidateDebtGuessInputSchema},
  output: {schema: ValidateDebtGuessOutputSchema},
  prompt: `You are assisting in a debt guessing game. A user has guessed an amount for a debt, and you need to provide feedback on how close their guess is to the actual amount. You will make a determination as to whether the guessed amount is close to the actual amount and provide a helpful feedback message.

  Here's the guessed amount: {{guessAmount}}
  Here's the actual amount: {{actualAmount}}

  Consider the guess to be close if it is within 10% of the actual amount. Set isClose to true if it is close, and false otherwise.
  Provide a feedback message that guides the user, but does not reveal the answer.`,
});

const validateDebtGuessFlow = ai.defineFlow(
  {
    name: 'validateDebtGuessFlow',
    inputSchema: ValidateDebtGuessInputSchema,
    outputSchema: ValidateDebtGuessOutputSchema,
  },
  async input => {
    const {output} = await validateDebtGuessPrompt(input);
    return output!;
  }
);
