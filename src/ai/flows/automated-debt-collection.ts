'use server';

/**
 * @fileOverview AI agent for automated debt collection, reaching out to debtors via email and text.
 *
 * - automateDebtCollection - A function to initiate the debt collection process.
 * - AutomateDebtCollectionInput - The input type for the automateDebtCollection function.
 * - AutomateDebtCollectionOutput - The return type for the automateDebtCollection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomateDebtCollectionInputSchema = z.object({
  debtorName: z.string().describe('The full name of the debtor.'),
  debtorContactInfo: z.string().describe('The debtor contact information, including phone and email'),
  debtAmount: z.number().describe('The amount of debt owed.'),
  originalDueDate: z.string().describe('The original due date of the debt (format: YYYY-MM-DD).'),
  lenderName: z.string().describe('The name of the lender.'),
  additionalDetails: z
    .string()
    .optional()
    .describe('Any additional details or context about the debt.'),
});
export type AutomateDebtCollectionInput = z.infer<typeof AutomateDebtCollectionInputSchema>;

const AutomateDebtCollectionOutputSchema = z.object({
  collectionSummary: z.string().describe('Summary of collection efforts, including emails and texts sent.'),
});
export type AutomateDebtCollectionOutput = z.infer<typeof AutomateDebtCollectionOutputSchema>;

export async function automateDebtCollection(input: AutomateDebtCollectionInput): Promise<AutomateDebtCollectionOutput> {
  return automateDebtCollectionFlow(input);
}

const debtCollectionPrompt = ai.definePrompt({
  name: 'debtCollectionPrompt',
  input: {schema: AutomateDebtCollectionInputSchema},
  output: {schema: AutomateDebtCollectionOutputSchema},
  prompt: `You are an AI agent tasked with contacting debtors to facilitate debt collection on behalf of the lender.

  Debtor Name: {{{debtorName}}}
  Debtor Contact Information: {{{debtorContactInfo}}}
  Debt Amount: {{{debtAmount}}}
  Original Due Date: {{{originalDueDate}}}
  Lender Name: {{{lenderName}}}
  Additional Details: {{{additionalDetails}}}

  Compose a series of communications (email and text messages) to send to the debtor, aiming to recover the debt. Be polite but firm.
  Include a summary of collection efforts in the output. Make sure it complies with debt collection laws.
  Do not include any personally identifiable information about other people.
  Do not reveal any private information.

  Output:
  Collection Summary:`, // Provide an output for the collection summary.
});

const automateDebtCollectionFlow = ai.defineFlow(
  {
    name: 'automateDebtCollectionFlow',
    inputSchema: AutomateDebtCollectionInputSchema,
    outputSchema: AutomateDebtCollectionOutputSchema,
  },
  async input => {
    const {output} = await debtCollectionPrompt(input);
    return output!;
  }
);
