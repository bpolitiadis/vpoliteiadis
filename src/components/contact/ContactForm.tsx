import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

export default function ContactForm() {
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: '', lastName: '', email: '', message: '', honeypot: '' },
    mode: 'onBlur',
  });

  const onSubmit = async (values: FormValues) => {
    // Honeypot: silently ignore
    if (values.honeypot && values.honeypot.trim().length > 0) {
      setStatus('success');
      form.reset();
      return;
    }

    try {
      setStatus('idle');
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
    }
  };

  return (
    <Card className="border border-primary/30 bg-card/40 backdrop-blur-sm animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-orbitron font-bold text-primary flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label="Email">✉️</span>
          {/* Keep exact copy */}
          Send Message
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form form={form} onSubmit={onSubmit} className="space-y-6" data-testid="contact-form">
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
                  aria-invalid={!!form.formState.errors.firstName}
                  disabled={form.formState.isSubmitting}
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
                  aria-invalid={!!form.formState.errors.lastName}
                  disabled={form.formState.isSubmitting}
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
                aria-invalid={!!form.formState.errors.email}
                disabled={form.formState.isSubmitting}
                data-testid="email-input"
                {...form.register('email')}
              />
            </FormControl>
            <FormMessage id="email-error" data-testid="form-field-email-error">{form.formState.errors.email?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor="message">Message <span className="text-neon-lime" aria-label="required">*</span></FormLabel>
            <FormControl>
              <Textarea
                id="message"
                rows={8}
                maxLength={5000}
                autoComplete="off"
                placeholder="Tell me about your project or inquiry..."
                aria-describedby="message-error"
                aria-invalid={!!form.formState.errors.message}
                className="resize-none min-h-[180px]"
                disabled={form.formState.isSubmitting}
                data-testid="message-textarea"
                {...form.register('message')}
              />
            </FormControl>
            <FormMessage id="message-error" data-testid="form-field-message-error">{form.formState.errors.message?.message}</FormMessage>
          </FormItem>

          {/* Hidden honeypot field */}
          <input type="hidden" aria-hidden="true" tabIndex={-1} data-testid="honeypot-input" {...form.register('honeypot')} />

          {/* Success/Error messages - keep exact copy */}
          <div role="alert" aria-live="polite" className="mt-2">
            {status === 'success' && (
              <div className="text-digital-emerald bg-digital-emerald/10 border border-digital-emerald/20 p-4 rounded-lg" data-testid="contact-success">
                <div className="flex items-center space-x-2">
                  <span className="text-xl" role="img" aria-label="Success">✅</span>
                  <span>Message sent successfully! I'll get back to you within 24-48 hours.</span>
                </div>
              </div>
            )}
            {status === 'error' && (
              <div className="text-destructive bg-destructive/10 border border-destructive/25 p-4 rounded-lg" data-testid="contact-error">
                <div className="flex items-center space-x-2">
                  <span className="text-xl" role="img" aria-label="Error">❌</span>
                  <span>There was an error sending your message. Please try again or contact me directly.</span>
                </div>
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full text-lg py-4 relative overflow-hidden group bg-muted border border-primary/40 rounded-lg text-primary hover:border-primary hover:shadow-neon transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 mt-8"
            aria-label="Send message"
            aria-busy={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
            data-testid="contact-submit"
          >
            <span className="relative z-10">🚀 Send Message</span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-lime to-digital-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}


