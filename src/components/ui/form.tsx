import * as React from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

interface FormProps<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues>;
  className?: string;
  onSubmit: (values: TFieldValues) => void | Promise<void>;
  children: React.ReactNode;
  'data-testid'?: string;
}

export function Form<TFieldValues extends FieldValues = FieldValues>({
  form,
  className = "",
  onSubmit,
  children,
  'data-testid': dataTestId,
}: FormProps<TFieldValues>) {
  const handleFormSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default to prevent form navigation
    e.preventDefault();
    e.stopPropagation();
    
    // React Hook Form's handleSubmit returns a function that:
    // - Validates the form first
    // - Only calls onSubmit if validation passes
    // - Prevents default automatically if validation fails
    // We need to call it without the event to ensure validation runs
    const submitHandler = form.handleSubmit(onSubmit, (_errors) => {
      // This callback runs when validation fails
      // Errors are automatically set in form.formState.errors
    });
    // Call the handler - it will validate and only call onSubmit if valid
    submitHandler(e);
  }, [form, onSubmit]);

  return (
    <form 
      onSubmit={handleFormSubmit}
      className={className} 
      noValidate 
      data-testid={dataTestId}
    >
      {children}
    </form>
  );
}

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FormItem({ className = "", ...props }: FormItemProps) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function FormLabel({ className = "", ...props }: FormLabelProps) {
  return (
    <label
      className={cn(
        "text-sm font-medium text-neon-lime/90",
        "block mb-1",
        className
      )}
      {...props}
    />
  );
}

export interface FormControlProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function FormControl({ className = "", ...props }: FormControlProps) {
  return <div className={cn("grid w-full items-center", className)} {...props} />;
}

export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  'data-testid'?: string;
}

export function FormMessage({ className = "", children, 'data-testid': dataTestId, ...props }: FormMessageProps) {
  // Only render if there are children (errors)
  if (!children) return null;

  return (
    <p
      className={cn(
        "text-sm text-destructive mt-1",
        className
      )}
      role="alert"
      aria-live="polite"
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </p>
  );
}

export interface FormDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FormDescription({ className = "", ...props }: FormDescriptionProps) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)} {...props} />
  );
}


