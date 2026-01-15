import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Send } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  firstName: z.string().min(1, { message: 'First Name is required' }).max(60),
  lastName: z.string().min(1, { message: 'Last Name is required' }).max(60),
  email: z.string().email({ message: 'Invalid email address' }).max(254),
  message: z.string().min(1, { message: 'Message is required' }).max(5000),
  honeypot: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Constants for status messages to avoid duplication
const STATUS_MESSAGES = {
  success: {
    emoji: '✅',
    text: 'Message sent successfully! I\'ll get back to you within 24-48 hours.',
  },
  error: {
    emoji: '❌',
    text: 'There was an error sending your message. Please try again or contact me directly.',
  },
} as const;

export default function ContactForm() {
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: '', lastName: '', email: '', message: '', honeypot: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: false, // Prevent auto-focus on errors
  });

  const onSubmit = async (values: FormValues) => {
    console.log('Form submitted successfully with values:', values);
    setIsSubmitting(true);
    setStatus('idle'); // Clear any previous status

    try {
      // Honeypot: silently ignore
      if (values.honeypot && values.honeypot.trim().length > 0) {
        setStatus('success');
        form.reset();
        setIsSubmitting(false);
        return;
      }

      // Add artificial delay for testing purposes (only in development)
      if (import.meta.env.DEV && values.message.includes('test-delay')) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          message: values.message,
        }),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      // No client logs per requirements
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border border-primary/30 bg-card/40 backdrop-blur-sm animate-fade-in h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl md:text-2xl font-orbitron font-bold text-neon-lime flex items-center gap-3" style={{ textShadow: '0 0 10px rgba(57, 255, 20, 0.6)' }}>
          <Mail className="w-6 h-6 text-neon-lime" aria-label="Send message" />
          {/* Keep exact copy */}
          Send Message
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <Form form={form} onSubmit={onSubmit} className="flex-1 flex flex-col min-h-0" data-testid="contact-form">
          {/* Fixed height fields container */}
          <div className="space-y-6 flex-shrink-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormItem>
                <FormLabel htmlFor="firstName">First Name <span className="text-neon-lime" aria-label="required">*</span></FormLabel>
                <FormControl>
                  <Input
                    id="firstName"
                    inputMode="text"
                    autoCapitalize="words"
                    autoComplete="given-name"
                    maxLength={60}
                    placeholder="Your first name"
                    aria-describedby="firstName-error"
                    aria-invalid={form.formState.errors.firstName ? 'true' : 'false'}
                    disabled={isSubmitting}
                    data-testid="first-name-input"
                    {...form.register('firstName')}
                  />
                </FormControl>
                <FormMessage id="firstName-error" data-testid="form-field-first-name-error">{form.formState.errors.firstName?.message}</FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="lastName">Last Name <span className="text-neon-lime" aria-label="required">*</span></FormLabel>
                <FormControl>
                  <Input
                    id="lastName"
                    inputMode="text"
                    autoCapitalize="words"
                    autoComplete="family-name"
                    maxLength={60}
                    placeholder="Your last name"
                    aria-describedby="lastName-error"
                    aria-invalid={form.formState.errors.lastName ? 'true' : 'false'}
                    disabled={isSubmitting}
                    data-testid="last-name-input"
                    {...form.register('lastName')}
                  />
                </FormControl>
                <FormMessage id="lastName-error" data-testid="form-field-last-name-error">{form.formState.errors.lastName?.message}</FormMessage>
              </FormItem>
            </div>

            <FormItem>
              <FormLabel htmlFor="email">Email <span className="text-neon-lime" aria-label="required">*</span></FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={254}
                  placeholder="your.email@example.com"
                  aria-describedby="email-error"
                  aria-invalid={form.formState.errors.email ? 'true' : 'false'}
                  disabled={isSubmitting}
                  data-testid="email-input"
                  {...form.register('email')}
                />
              </FormControl>
              <FormMessage id="email-error" data-testid="form-field-email-error">{form.formState.errors.email?.message}</FormMessage>
            </FormItem>
          </div>

          {/* Message field - grows to fill available space */}
          <FormItem className="flex-1 flex flex-col min-h-0 mt-6">
            <FormLabel htmlFor="message">Message <span className="text-neon-lime" aria-label="required">*</span></FormLabel>
            <FormControl className="flex-1 min-h-0">
              <Textarea
                id="message"
                maxLength={5000}
                autoComplete="off"
                placeholder="Tell me about your project or inquiry..."
                aria-describedby="message-error"
                aria-invalid={form.formState.errors.message ? 'true' : 'false'}
                className="resize-none h-full min-h-[180px]"
                disabled={isSubmitting}
                data-testid="message-textarea"
                {...form.register('message')}
              />
            </FormControl>
            <FormMessage id="message-error" data-testid="form-field-message-error">{form.formState.errors.message?.message}</FormMessage>
          </FormItem>

          {/* Hidden honeypot field */}
          <input type="hidden" aria-hidden="true" tabIndex={-1} data-testid="honeypot-input" {...form.register('honeypot')} />

          {/* Status messages and button container - fixed at bottom */}
          <div className="flex-shrink-0 mt-6 space-y-4">
            {/* Status messages */}
            <div role="alert" aria-live="polite">
              {status === 'success' && (
                <div className="text-digital-emerald bg-digital-emerald/10 border border-digital-emerald/20 p-4 rounded-lg" data-testid="contact-success">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl" role="img" aria-label={STATUS_MESSAGES.success.emoji === '✅' ? 'Success' : 'Status'}>
                      {STATUS_MESSAGES.success.emoji}
                    </span>
                    <span>{STATUS_MESSAGES.success.text}</span>
                  </div>
                </div>
              )}
              {status === 'error' && (
                <div className="text-destructive bg-destructive/10 border border-destructive/25 p-4 rounded-lg" data-testid="contact-error">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl" role="img" aria-label={STATUS_MESSAGES.error.emoji === '❌' ? 'Error' : 'Status'}>
                      {STATUS_MESSAGES.error.emoji}
                    </span>
                    <span>{STATUS_MESSAGES.error.text}</span>
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full"
              aria-label="Send message"
              aria-busy={isSubmitting}
              disabled={isSubmitting}
              data-testid="contact-submit"
            >
              Send Message
              <Send className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}


