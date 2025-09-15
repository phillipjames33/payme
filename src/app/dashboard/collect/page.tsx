
"use client";

import { useEffect, useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  automateDebtCollection,
  type AutomateDebtCollectionOutput,
} from '@/ai/flows/automated-debt-collection';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Bot, CheckCircle } from 'lucide-react';
import { USERS } from '@/lib/data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const collectionSchema = z.object({
  debtorName: z.string().min(2, 'Name is too short.'),
  debtorContactInfo: z.string().min(5, 'Contact info is required. (Email or Phone)'),
  debtAmount: z.coerce.number().positive('Amount must be positive.'),
  originalDueDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date.'),
  additionalDetails: z.string().optional(),
});
type CollectionFormValues = z.infer<typeof collectionSchema>;

export default function AICollectorPage() {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AutomateDebtCollectionOutput | null>(null);
  const { toast } = useToast();
  const currentUser = USERS[0];

  const form = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      debtorName: '',
      debtorContactInfo: '',
      debtAmount: undefined,
      originalDueDate: '',
      additionalDetails: '',
    },
  });
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      form.setValue('originalDueDate', new Date().toISOString().split('T')[0]);
    }
  }, [isClient, form]);


  const onSubmit: SubmitHandler<CollectionFormValues> = async (data) => {
    setLoading(true);
    setResult(null);
    try {
      const collectionResult = await automateDebtCollection({
        ...data,
        lenderName: currentUser.displayName,
      });
      setResult(collectionResult);
      toast({
        title: 'Collection Agent Dispatched!',
        description: 'The AI is now handling communications.',
      });
    } catch (error) {
      console.error('Error with collection agent:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Could not dispatch the agent. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-3">
            <Bot className="text-primary" />
            AI Collections Agent
          </CardTitle>
          <CardDescription>
            Authorize our AI agent to contact a debtor on your behalf. Provide the necessary details below.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="debtorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Debtor's Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="debtorContactInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Debtor's Contact (Email/Phone)</FormLabel>
                    <FormControl>
                      <Input placeholder="john.d@email.com or 555-123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="debtAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount Owed</FormLabel>
                       <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            <Input type="number" step="0.01" placeholder="50.00" className="pl-7" {...field} />
                          </div>
                       </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="originalDueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Original Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="additionalDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Details (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., verbal agreement details, last contact date, etc." {...field} />
                    </FormControl>
                     <FormDescription>Provide any context that might help the agent.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
              <Button type="submit" disabled={loading} size="lg">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Dispatching Agent...
                  </>
                ) : (
                  'Dispatch AI Agent'
                )}
              </Button>
              {result && (
                <Alert className='w-full animate-in fade-in'>
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle className="font-headline">Agent Dispatched!</AlertTitle>
                    <AlertDescription className='prose prose-sm dark:prose-invert'>
                        <p>Summary of actions taken:</p>
                        <p>{result.collectionSummary}</p>
                    </AlertDescription>
                </Alert>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
