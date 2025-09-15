
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DEBTS } from '@/lib/data';
import { Swords, Loader2, Info } from 'lucide-react';
import {
  validateDebtGuess,
  type ValidateDebtGuessOutput,
} from '@/ai/flows/validate-debt-guess';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const guessSchema = z.object({
  guessAmount: z.coerce
    .number({ invalid_type_error: 'Please enter a valid number.' })
    .positive('Guess must be positive.'),
});
type GuessFormValues = z.infer<typeof guessSchema>;

const currentDebt = DEBTS[0];

export function PayMeGameCard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValidateDebtGuessOutput | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<GuessFormValues>({
    resolver: zodResolver(guessSchema),
    defaultValues: {
      guessAmount: '' as any,
    },
  });

  const onSubmit: SubmitHandler<GuessFormValues> = async (data) => {
    setLoading(true);
    setResult(null);
    try {
      const validationResult = await validateDebtGuess({
        guessAmount: data.guessAmount,
        actualAmount: currentDebt.debtAmount,
      });
      setResult(validationResult);
      setSubmitted(true);
    } catch (error) {
      console.error('Error validating guess:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Could not validate your guess. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const glowClass = submitted
    ? result?.isClose
      ? 'shadow-[0_0_30px_5px] shadow-green-500/50'
      : 'shadow-[0_0_30px_5px] shadow-red-500/50'
    : '';

  return (
    <Card className={cn('transition-shadow duration-1000', glowClass)}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <Swords className="size-6 text-primary" />
              PayMe Game
            </CardTitle>
            <CardDescription>
              A debt was posted by{' '}
              <a href={`/${currentDebt.lender.username}`} className="font-semibold text-primary hover:underline">
                {currentDebt.lender.displayName}
              </a>
              .
            </CardDescription>
          </div>
          <Avatar>
            <AvatarImage
              src={currentDebt.lender.profilePictureUrl}
              alt={currentDebt.lender.displayName}
              data-ai-hint="person portrait"
            />
            <AvatarFallback>
              {currentDebt.lender.displayName
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm dark:prose-invert bg-secondary/50 p-4 rounded-lg border">
          <p className="text-lg italic leading-relaxed">"{currentDebt.description}"</p>
        </div>
        <p className="text-right text-xs text-muted-foreground mt-2">
          Owed to: {currentDebt.lender.displayName} by {currentDebt.debtorName}
        </p>

        {submitted && result && (
          <Alert
            variant={result.isClose ? 'default' : 'destructive'}
            className="mt-6 animate-in fade-in"
          >
            <Info className="h-4 w-4" />
            <AlertTitle className="font-headline">
              {result.isClose ? 'So close!' : 'Not quite!'}
            </AlertTitle>
            <AlertDescription>{result.feedbackMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <FormField
              control={form.control}
              name="guessAmount"
              render={({ field }) => (
                <FormItem className="w-full sm:w-auto flex-1">
                  <FormLabel className="sr-only">Guess Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="How much do they owe?"
                        className="pl-7"
                        disabled={loading || submitted}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={loading || submitted}
              variant="default"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Guess'
              )}
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
